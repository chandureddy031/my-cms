import { API_URL, REVALIDATE, SECTIONS, SITE } from "@/constants";

export type Section = (typeof SECTIONS)[number];
export type Item = {
  id: number; section: Section; title: string; body: string; details: string; image: string | null; meta: string | null;
  position: number; slug: string | null; parent: string | null; email: string | null; phone: string | null;
};
export type Site = typeof SITE;
export type Donation = { id: number; name: string; email: string; amount: string; cause: string; message: string | null; created_at: string };

// Server-side fetch. fresh=true skips the cache (CMS); key adds the admin header.
export async function get<T>(path: string, { fresh = false, key }: { fresh?: boolean; key?: string } = {}): Promise<T | null> {
  try {
    const r = await fetch(API_URL + path, {
      ...(fresh ? { cache: "no-store" } : { next: { revalidate: REVALIDATE } }),
      headers: key ? { "X-Admin-Key": key } : undefined,
    });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

export const getSection = async (section: Section, fresh = false) => (await get<Item[]>(`/api/${section}`, { fresh })) ?? [];
export const getBySlug = async (section: Section, slug: string) => (await getSection(section)).find((i) => i.slug === slug);
export const getDonations = async (key: string) => (await get<Donation[]>("/api/donations", { fresh: true, key })) ?? [];

// Values saved in the CMS override the defaults in constants.
export async function getSite(fresh = false): Promise<Site> {
  const d = (await get<Partial<Site>>("/api/site", { fresh })) ?? {};
  return Object.fromEntries(Object.entries(SITE).map(([k, v]) => [k, d[k as keyof Site] || v])) as Site;
}
