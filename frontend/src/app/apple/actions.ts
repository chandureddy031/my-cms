"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, API_URL } from "@/constants";
import { FAULT_TEXT, faultFrom } from "@/lib/diagnose";

// Calls the API with the editor key; on failure goes back to `back` with the error shown.
async function call(method: string, path: string, back: string, body?: unknown) {
  const key = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  let msg = FAULT_TEXT.backend;
  try {
    const r = await fetch(API_URL + path, {
      method,
      headers: { "Content-Type": "application/json", "X-Admin-Key": key },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (r.ok) return void revalidatePath("/", "layout"); // public pages update now, not after 60s
    msg = r.status === 401 ? "Admin key no longer valid — lock and unlock again"
      : r.status === 422 ? `Please check the fields: ${(await r.text()).slice(0, 300)}`
      : r.status === 409 ? "That URL slug is already used in this section — pick another."
      : await faultFrom(r);
  } catch {}
  redirect(`${back}${back.includes("?") ? "&" : "?"}error=${encodeURIComponent(msg)}`);
}

const s = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

function item(f: FormData) {
  const opt = (k: string) => s(f, k) || null;
  return {
    section: s(f, "section"), title: s(f, "title"), body: s(f, "body"), details: s(f, "details"), position: Number(s(f, "position")) || 0,
    image: opt("image"), meta: opt("meta"), slug: opt("slug"), parent: opt("parent"), email: opt("email"), phone: opt("phone"),
  };
}

export async function unlock(f: FormData) {
  const key = s(f, "key");
  const r = await fetch(`${API_URL}/api/admin/check`, { headers: { "X-Admin-Key": key }, cache: "no-store" }).catch(() => null);
  if (r?.status !== 200)
    redirect("/apple?error=" + encodeURIComponent(
      r?.status === 401 ? "Wrong admin key."
        : r?.status === 503 && !(await r.clone().json().catch(() => ({}))).source ? "The server has no ADMIN_KEY set (or it is shorter than 12 characters)."
        : await faultFrom(r)));
  (await cookies()).set(ADMIN_COOKIE, key, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/apple", maxAge: 60 * 60 * 8 });
  redirect("/apple");
}

export async function lock() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/apple" });
  redirect("/apple");
}

export async function saveSite(f: FormData) {
  await call("PUT", "/api/site", "/apple/settings", Object.fromEntries([...f.entries()].filter(([k]) => !k.startsWith("$")).map(([k, v]) => [k, String(v)])));
  redirect("/apple/settings?saved=1");
}

export async function saveItem(f: FormData) {
  const id = s(f, "id"), data = item(f), back = `/apple/${data.section}/${id || "new"}`;
  await call(id ? "PUT" : "POST", id ? `/api/content/${Number(id)}` : "/api/content", back, data);
  redirect(`/apple/${data.section}?saved=${encodeURIComponent(data.title)}`);
}

export async function deleteItem(f: FormData) {
  const section = s(f, "section");
  await call("DELETE", `/api/content/${Number(s(f, "id"))}`, `/apple/${section}/${s(f, "id")}`);
  redirect(`/apple/${section}?saved=deleted`);
}
