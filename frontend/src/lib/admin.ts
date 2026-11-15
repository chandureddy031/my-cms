import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/constants";

export const readKey = async () => (await cookies()).get(ADMIN_COOKIE)?.value;

// Every CMS page except the unlock screen calls this.
export async function adminKey() {
  const key = await readKey();
  if (!key) redirect("/apple");
  return key;
}
