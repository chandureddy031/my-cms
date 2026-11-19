/** Sections of the one-page site, in page order; the header links scroll to these ids. */
export const WEBSITE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "programmes", label: "Programmes" },
  { id: "stories", label: "Stories" },
  { id: "gallery", label: "Gallery" },
  { id: "people", label: "People" },
  { id: "reports", label: "Reports" },
] as const;

export const DONATE_SECTION_ID = "donate";
export const TOP_SECTION_ID = "top";

/** Photos shown in the gallery section. */
export const GALLERY_LIMIT = 12;
