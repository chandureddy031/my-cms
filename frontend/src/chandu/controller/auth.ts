import { cache } from "react";
import { cookies } from "next/headers";
import { verifyAdminKey } from "@/lib/admin/session";

export const COOKIE = "apples_admin";

/** Same admin key as the main CMS (/apple): the API checks it, so there is no separate password. */
export async function checkKey(key: string) {
  return !!key && ((await verifyAdminKey(key))?.ok ?? false);
}

/** The key in the login cookie is still valid (checked once per request). */
export const isAdmin = cache(async () => checkKey((await cookies()).get(COOKIE)?.value ?? ""));
