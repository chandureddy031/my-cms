import { API_URL, REVALIDATE, SECTIONS, SITE } from "@/constants";

export type Section = (typeof SECTIONS)[number];
export type Item = {
  id: number; section: Section; title: string; body: string; details: string; image: string | null; meta: string | null;
  position: number; slug: string | null; parent: string | null; email: string | null; phone: string | null;
};
export type Site = typeof SITE;
export type Donation = { id: number; name: string; email: string; amount: string; cause: string; message: string | null; created_at: string };

// Server-side API call. Throws on network/HTTP errors so Next keeps serving the last good page
// (or shows error.tsx) instead of caching an empty one. fresh=true skips the cache (CMS).
export async function get<T>(path: string, { fresh = false, key }: { fresh?: boolean; key?: string } = {}): Promise<T> {
  const r = await fetch(API_URL + path, {
    ...(fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE } }),
    headers: key ? { "X-Admin-Key": key } : undefined,
  });
  if (!r.ok) throw new Error(`API ${r.status} on ${path}`);
  return r.json();
}

export const getSection = (section: Section, fresh = false) => get<Item[]>(`/api/${section}`, { fresh });
export const getBySlug = async (section: Section, slug: string) => (await getSection(section)).find((i) => i.slug === slug);
export const getDonations = (key: string) => get<Donation[]>("/api/donations", { fresh: true, key });

// Values saved in the CMS override the defaults in constants; defaults also cover an API outage.
export async function getSite(fresh = false): Promise<Site> {
  const d = await get<Partial<Site>>("/api/site", { fresh }).catch(() => ({}) as Partial<Site>);
  return Object.fromEntries(Object.entries(SITE).map(([k, v]) => [k, d[k as keyof Site] || v])) as Site;
}
