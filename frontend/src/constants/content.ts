import type { Section } from "@/types/content";

/** Content sections stored by the API (`content.section`). */
export const SECTIONS = ["activities", "reports", "stories", "gallery", "caretakers", "stats"] as const;

export const isSection = (value: string): value is Section => (SECTIONS as readonly string[]).includes(value);

/** Caretakers in this group appear as the team on the About page. */
export const TEAM_GROUP = "team";
