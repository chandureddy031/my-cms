import { PhotoCard } from "@/components/shared";
import type { ContentItem } from "@/types/content";
import { storyHref } from "@/utils/routes";

interface StoryCardProps {
  story: ContentItem;
}

/** A success story, linking to the full story. */
export function StoryCard({ story }: StoryCardProps) {
  return <PhotoCard item={story} href={storyHref(story.slug!)} linkLabel="Read story" />;
}
