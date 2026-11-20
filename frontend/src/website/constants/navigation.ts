import { websiteRoutes } from "../routes";

/** Header menu, in the order from the requirements. Donate is a separate button. */
export const WEBSITE_NAV = [
  { href: websiteRoutes.home, label: "Home" },
  { href: websiteRoutes.about, label: "About Us" },
  { href: websiteRoutes.activities, label: "Activities" },
  { href: websiteRoutes.reports, label: "Impact Reports" },
  { href: websiteRoutes.stories, label: "Case Studies" },
  { href: websiteRoutes.gallery, label: "Gallery" },
  { href: websiteRoutes.contact, label: "Contact" },
] as const;
