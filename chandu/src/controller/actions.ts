"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { checkPassword, COOKIE, isAdmin, sessionToken } from "./auth";
import { getContent, saveContent, type Content } from "./content";

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!checkPassword(String(form.get("password") ?? ""))) return "Wrong password";
  (await cookies()).set(COOKIE, sessionToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
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
