import type { ContentField } from "@/types/content";

export const FIELD_HINTS: Partial<Record<ContentField, string>> = {
  details: "Blank line = new paragraph. Start a line with “## ” for a heading, or “- ” for a bullet point.",
  image: "A file in frontend/public/assets, e.g. /assets/elder.jpg",
  slug: "Lowercase letters, numbers and dashes. Used in the page address.",
  parent: "For gallery and stories: the activity slug, e.g. elder-care.",
};

/** Edited in a textarea instead of a one-line input. */
export const MULTILINE_FIELDS: ContentField[] = ["body", "details"];
