import type { IconName } from "@/components/ui";
import { aboutHref, activitiesHref, caretakersHref, donateHref, galleryHref, homeHref, reportsHref, storiesHref } from "@/utils/routes";

export interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

/** Sidebar and footer links. The Donate link is styled as a button. */
export const SITE_NAV: NavLink[] = [
  { href: homeHref(), label: "Home", icon: "home" },
  { href: aboutHref(), label: "About Us", icon: "info" },
  { href: activitiesHref(), label: "Activities", icon: "spark" },
  { href: reportsHref(), label: "Reports", icon: "doc" },
  { href: storiesHref(), label: "Success Stories", icon: "star" },
  { href: galleryHref(), label: "Gallery", icon: "image" },
  { href: caretakersHref(), label: "Caretakers", icon: "people" },
  { href: donateHref(), label: "Donate", icon: "heart" },
];
