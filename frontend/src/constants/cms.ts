import type { IconName } from "@/components/ui";
import type { ContentField, Section } from "@/types/content";
import { cmsDashboardHref, cmsDonationsHref, cmsSectionHref, cmsSettingsHref } from "@/utils/routes";
import { SECTIONS } from "./content";

export const SECTION_LABELS: Record<Section, string> = {
  activities: "Activities",
  reports: "Reports",
  stories: "Success Stories",
  gallery: "Gallery",
  caretakers: "Caretakers",
  stats: "Home Stats",
};

export const SECTION_ICONS: Record<Section, IconName> = {
  activities: "spark",
  reports: "doc",
  stories: "star",
  gallery: "image",
  caretakers: "people",
  stats: "home",
};

/** CMS menu, in order. */
export const CMS_NAV = [
  { href: cmsDashboardHref(), label: "Dashboard" },
  ...SECTIONS.map((section) => ({ href: cmsSectionHref(section), label: SECTION_LABELS[section] })),
  { href: cmsDonationsHref(), label: "Donations" },
  { href: cmsSettingsHref(), label: "Settings" },
];

/** Fields the editor shows for each section, with their labels (in display order). */
export const SECTION_FIELDS: Record<Section, Partial<Record<ContentField, string>>> = {
  activities: { title: "Title", slug: "URL slug", meta: "Label", body: "Summary", details: "Full page text", image: "Image path", position: "Order" },
  reports: { title: "Title", slug: "URL slug", meta: "Year", body: "Summary", image: "PDF file path (e.g. /assets/report-2025.pdf)", position: "Order" },
  stories: { title: "Title", slug: "URL slug", parent: "Activity slug", meta: "Label", body: "Summary", details: "Full story", image: "Image path", position: "Order" },
  gallery: { title: "Caption", parent: "Activity slug (album)", meta: "Label", body: "Description", image: "Image path", position: "Order" },
  caretakers: {
    title: "Name", slug: "URL slug", meta: "Role", parent: 'Group ("team" shows on About Us)', body: "Short intro", details: "About",
    image: "Photo path (blank = initials)", email: "Email", phone: "Phone", position: "Order",
  },
  stats: { title: "Label", body: "Value", position: "Order" },
};

export const CMS_MESSAGES = {
  locked: "Please unlock the editor (session missing or expired).",
  wrongKey: "Wrong admin key.",
  keyMissingOnServer: "The server has no ADMIN_KEY set (or it is shorter than 12 characters).",
  keyExpired: "Admin key no longer valid — lock and unlock again",
  slugTaken: "That URL slug is already used in this section — pick another.",
  invalidFields: (detail: string) => `Please check the fields: ${detail.slice(0, 300)}`,
};
