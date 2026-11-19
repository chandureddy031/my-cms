// Every URL in the app. Link through these helpers instead of writing paths by hand,
// so "go to definition" on any href leads here.
import type { Section } from "@/types/content";

export const homeHref = () => "/";
export const aboutHref = () => "/about";
export const statusHref = () => "/status";

export const activitiesHref = () => "/activities";
export const activityHref = (slug: string) => `/activities/${slug}`;

export const storiesHref = () => "/success-stories";
export const storyHref = (slug: string) => `/success-stories/${slug}`;

export const galleryHref = () => "/gallery";
export const albumHref = (activitySlug: string) => `/gallery/${activitySlug}`;

export const caretakersHref = () => "/caretakers";
export const caretakerHref = (slug: string) => `/caretakers/${slug}`;

export const reportsHref = () => "/reports";
export const reportHref = (slug: string) => `/reports/${slug}`;

export const donateHref = (cause?: string) => (cause ? `/donate?cause=${encodeURIComponent(cause)}` : "/donate");

export const cmsDashboardHref = () => "/apple";
export const cmsDonationsHref = () => "/apple/donations";
export const cmsSettingsHref = () => "/apple/settings";
export const cmsSectionHref = (section: Section) => `/apple/${section}`;
export const cmsItemHref = (section: Section, id: number | "new") => `/apple/${section}/${id}`;

/** Public page of a CMS item, for sections that have one. */
export const publicItemHref: Partial<Record<Section, (slug: string) => string>> = {
  activities: activityHref,
  stories: storyHref,
  caretakers: caretakerHref,
  reports: reportHref,
};

/** True when `path` is `href` or a page below it ("/" and "/apple" only match themselves). */
export const isActivePath = (path: string, href: string) =>
  href === homeHref() || href === cmsDashboardHref() ? path === href : path.startsWith(href);

/** `path` with ?error=… added. */
export const withError = (path: string, message: string) => `${path}${path.includes("?") ? "&" : "?"}error=${encodeURIComponent(message)}`;
