import type { ContentItem } from "@/types/content";

/** The first photo of every album plus each album's second, so every programme shows up. */
export const pickMarqueePhotos = (gallery: ContentItem[]) =>
  gallery.filter((photo, i, all) => all.findIndex((other) => other.parent === photo.parent) === i || i % 5 === 1);
