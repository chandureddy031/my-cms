import { ADMIN_KEY_HEADER, API_URL, REVALIDATE_SECONDS } from "@/constants/config";
import { FAULT_TEXT } from "@/constants/health";

export const apiUrl = (path: string) => API_URL + path;

export const adminHeaders = (adminKey: string) => ({ [ADMIN_KEY_HEADER]: adminKey });

interface GetOptions {
  /** Skip the cache (CMS pages always want the latest data). */
  fresh?: boolean;
  adminKey?: string;
}

/**
 * Server-side GET. Throws on network or HTTP errors so Next keeps serving the last good
 * page (or shows error.tsx) instead of caching an empty one.
 */
export async function apiGet<T>(path: string, { fresh = false, adminKey }: GetOptions = {}): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...(fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE_SECONDS } }),
    headers: adminKey ? adminHeaders(adminKey) : undefined,
  });
  if (!response.ok) throw new Error(`API ${response.status} on ${path}`);
  return response.json();
}

/** Message for a failed API response, naming the failing layer. */
export async function describeFailure(response: Response | null): Promise<string> {
  if (!response) return FAULT_TEXT.backend;
  const body = await response.clone().json().catch(() => ({}));
  return body.source === "database" ? FAULT_TEXT.database : `Backend error (${response.status}). Please try again.`;
}
