import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "apples_admin";

/** Session token derived from the password: changing ADMIN_PASSWORD logs everyone out. */
export function sessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set in .env.local");
  return createHmac("sha256", password).update("apples-admin-session").digest("hex");
}

const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export const checkPassword = (input: string) => same(input, process.env.ADMIN_PASSWORD ?? "");

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  return !!value && same(value, sessionToken());
}
