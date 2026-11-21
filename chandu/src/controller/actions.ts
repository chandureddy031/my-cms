"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkKey, COOKIE, isAdmin } from "./auth";
import { getContent, saveContent, type Content } from "./content";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  const key = String(form.get("password") ?? "");
  if (!(await checkKey(key))) return "Wrong key, or the server is waking up — try again in a minute";
  (await cookies()).set(COOKIE, key, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  revalidatePath("/admin", "layout");
  return null;
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  revalidatePath("/admin", "layout");
}

/** Saves some sections (one CMS page). Only sections that already exist can be replaced. */
export async function save(json: string): Promise<string> {
  if (!(await isAdmin())) return "Not logged in";
  let part: Partial<Content>;
  try { part = JSON.parse(json); } catch { return "Invalid data"; }
  const current = getContent();
  const unknown = Object.keys(part).filter((k) => !(k in current));
  if (unknown.length) return `Unknown sections: ${unknown.join(", ")}`;
  saveContent({ ...current, ...part });
  revalidatePath("/", "layout"); // rebuild every page with the new text
  return "Saved ✓ — the website is updated";
}
