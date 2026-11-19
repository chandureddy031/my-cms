import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_MESSAGES } from "@/constants/cms";
import { ADMIN_COOKIE } from "@/constants/config";
import { adminHeaders, apiUrl } from "@/lib/api/client";
import { cmsDashboardHref, withError } from "@/utils/routes";

/** Asks the API whether a key is valid; null when the API can't be reached. */
export const verifyAdminKey = (key: string) =>
  fetch(apiUrl("/api/admin/check"), { headers: adminHeaders(key), cache: "no-store" }).catch(() => null);

/** The editor key from the cookie if the API still accepts it (checked once per request). */
export const readAdminKey = cache(async () => {
  const key = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!key) return undefined;
  return (await verifyAdminKey(key))?.ok ? key : undefined;
});

/** Every CMS page except the unlock screen: the key, or back to the unlock screen. */
export async function requireAdminKey() {
  const key = await readAdminKey();
  if (!key) redirect(withError(cmsDashboardHref(), CMS_MESSAGES.locked));
  return key;
}
