import { cache } from "react";
import { cookies } from "next/headers";

export const COOKIE = "apples_admin";

// Same admin key as the my-cms CMS (/apple): the backend API checks it, so there is no separate password here.
const API_URL = process.env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://apples-api-1txi.onrender.com" : "http://localhost:8000");

/** True when the my-cms API accepts this key; false if wrong or the API can't be reached. */
export async function checkKey(key: string) {
  if (!key) return false;
  const res = await fetch(`${API_URL}/api/admin/check`, { headers: { "X-Admin-Key": key }, cache: "no-store" }).catch(() => null);
  return res?.ok ?? false;
}

/** The key in the login cookie is still valid (checked once per request). */
export const isAdmin = cache(async () => checkKey((await cookies()).get(COOKIE)?.value ?? ""));
