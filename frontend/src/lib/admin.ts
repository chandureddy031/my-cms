import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, API_URL } from "@/constants";

// The editor key from the cookie, but only if the API still accepts it (checked once per request).
export const readKey = cache(async () => {
  const key = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!key) return undefined;
  const ok = await fetch(`${API_URL}/api/admin/check`, { headers: { "X-Admin-Key": key }, cache: "no-store" }).then((r) => r.ok, () => false);
  return ok ? key : undefined;
});

// Every CMS page except the unlock screen calls this.
export async function adminKey() {
  const key = await readKey();
  if (!key) redirect("/apple?error=" + encodeURIComponent("Please unlock the editor (session missing or expired)."));
  return key;
}
