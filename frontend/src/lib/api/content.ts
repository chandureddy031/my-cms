import type { ContentItem, Section } from "@/types/content";
import { apiGet } from "./client";

export const getSection = (section: Section, { fresh = false } = {}) => apiGet<ContentItem[]>(`/api/${section}`, { fresh });

export async function getBySlug(section: Section, slug: string) {
  return (await getSection(section)).find((item) => item.slug === slug);
}

/** CMS: one item, always fresh. */
export async function getById(section: Section, id: number) {
  return (await getSection(section, { fresh: true })).find((item) => item.id === id);
}

/** Items whose `parent` is the given slug (an activity's photos and stories, a caretaker group). */
export const childrenOf = (items: ContentItem[], parent: string) => items.filter((item) => item.parent === parent);
