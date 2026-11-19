import { PhotoCard } from "@/components/shared";
import type { ContentItem } from "@/types/content";
import { activityHref } from "@/utils/routes";

interface ActivityCardProps {
  activity: ContentItem;
}

/** A programme, linking to its full page. */
export function ActivityCard({ activity }: ActivityCardProps) {
  return <PhotoCard item={activity} href={activityHref(activity.slug!)} linkLabel="See how we work" />;
}
