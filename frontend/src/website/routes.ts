/** Every /website URL in one place. */
const BASE = "/website";

export const websiteRoutes = {
  home: BASE,
  about: `${BASE}/about`,
  activities: `${BASE}/activities`,
  reports: `${BASE}/reports`,
  stories: `${BASE}/stories`,
  gallery: `${BASE}/gallery`,
  contact: `${BASE}/contact`,
  donate: `${BASE}/donate`,
} as const;

export const galleryHref = (group?: string) => (group ? `${websiteRoutes.gallery}?group=${encodeURIComponent(group)}` : websiteRoutes.gallery);
export const donateHref = (cause?: string) => (cause ? `${websiteRoutes.donate}?cause=${encodeURIComponent(cause)}` : websiteRoutes.donate);

/** Home matches only itself; other links also match their sub-paths. */
export const isActive = (pathname: string, href: string) => (href === BASE ? pathname === BASE : pathname.startsWith(href));
