export const SITE = {
  name: "APPLE",
  tagline: "Caring for every age, every ability, every village.",
  about:
    "APPLE is a non-profit working since 2008 across rural and urban communities. We support senior citizens, educate children from poor families, run community health services, champion the wellbeing of persons with disabilities, build careers and strengthen agriculture.",
  mission: "Dignity, health and opportunity for every person we serve.",
  vision: "Self-reliant communities where no one is left behind.",
  email: "contact@apple-foundation.org",
  phone: "+91 00000 00000",
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
export const REVALIDATE = 60;

// One colour per letter of the logo; cycles if the name is longer.
export const LOGO_COLORS = ["#15803d", "#65a30d", "#0d9488", "#ca8a04", "#16a34a", "#059669"];

export const NAV = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About Us", icon: "info" },
  { href: "/activities", label: "Activities", icon: "spark" },
  { href: "/reports", label: "Reports", icon: "doc" },
  { href: "/success-stories", label: "Success Stories", icon: "star" },
  { href: "/gallery", label: "Gallery", icon: "image" },
  { href: "/caretakers", label: "Caretakers", icon: "people" },
  { href: "/donate", label: "Donate", icon: "heart" },
] as const;

export const AMOUNTS = [500, 1000, 2500, 5000, 10000];

export const SECTIONS = ["activities", "reports", "stories", "gallery", "caretakers", "stats"] as const;
export const SECTION_LABELS: Record<(typeof SECTIONS)[number], string> = {
  activities: "Activities", reports: "Reports", stories: "Success Stories", gallery: "Gallery", caretakers: "Caretakers", stats: "Home Stats",
};
// Which fields the CMS shows per section, with what label.
export const FIELDS: Record<(typeof SECTIONS)[number], Partial<Record<"title" | "slug" | "meta" | "body" | "details" | "image" | "parent" | "email" | "phone" | "position", string>>> = {
  activities: { title: "Title", slug: "URL slug", meta: "Label", body: "Summary", details: "Full page text", image: "Image path", position: "Order" },
  reports: { title: "Title", slug: "URL slug", meta: "Year", body: "Summary", image: "PDF file path (e.g. /assets/report-2025.pdf)", position: "Order" },
  stories: { title: "Title", slug: "URL slug", parent: "Activity slug", meta: "Label", body: "Summary", details: "Full story", image: "Image path", position: "Order" },
  gallery: { title: "Caption", parent: "Activity slug (album)", meta: "Label", body: "Description", image: "Image path", position: "Order" },
  caretakers: { title: "Name", slug: "URL slug", meta: "Role", parent: "Group (\"team\" shows on About Us)", body: "Short intro", details: "About", image: "Photo path (blank = initials)", email: "Email", phone: "Phone", position: "Order" },
  stats: { title: "Label", body: "Value", position: "Order" },
};
export const ADMIN_COOKIE = "apple_admin";
