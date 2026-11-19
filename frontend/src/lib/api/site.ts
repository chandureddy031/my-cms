import { SITE_DEFAULTS } from "@/constants/site";
import type { SiteSettings } from "@/types/site";
import { apiGet } from "./client";

/** Site details: CMS settings where saved, defaults otherwise (also while the API is down). */
export async function getSiteSettings({ fresh = false } = {}): Promise<SiteSettings> {
  const saved = await apiGet<Partial<SiteSettings>>("/api/site", { fresh }).catch((): Partial<SiteSettings> => ({}));
  const settings = { ...SITE_DEFAULTS };
  for (const key of Object.keys(settings) as (keyof SiteSettings)[]) settings[key] = saved[key] || settings[key];
  return settings;
}
