import { TEAM_GROUP } from "@/constants/content";
import type { ContentItem } from "@/types/content";
import { MARQUEE_PHOTOS_PER_PROGRAMME } from "./constants/content";

/** A few photos from each programme, interleaved so neighbours differ. */
export function marqueePhotos(gallery: ContentItem[]): string[] {
  const byProgramme = new Map<string, string[]>();
  for (const photo of gallery) {
    if (!photo.image || !photo.parent) continue;
    const list = byProgramme.get(photo.parent) ?? [];
    if (list.length < MARQUEE_PHOTOS_PER_PROGRAMME) byProgramme.set(photo.parent, [...list, photo.image]);
  }
  const lists = [...byProgramme.values()];
  return Array.from({ length: MARQUEE_PHOTOS_PER_PROGRAMME }, (_, i) => lists.flatMap((list) => list[i] ?? [])).flat();
}

/** Leadership team first, then caretakers. */
export const splitPeople = (people: ContentItem[]) => ({
  team: people.filter((person) => person.parent === TEAM_GROUP),
  caretakers: people.filter((person) => person.parent !== TEAM_GROUP),
});
