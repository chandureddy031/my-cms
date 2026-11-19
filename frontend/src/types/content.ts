import type { SECTIONS } from "@/constants/content";

export type Section = (typeof SECTIONS)[number];

/** One row of the `content` table. Each section uses a subset of the fields. */
export interface ContentItem {
  id: number;
  section: Section;
  title: string;
  body: string;
  details: string;
  image: string | null;
  meta: string | null;
  position: number;
  slug: string | null;
  parent: string | null;
  email: string | null;
  phone: string | null;
}

export type ContentField = Exclude<keyof ContentItem, "id" | "section">;
