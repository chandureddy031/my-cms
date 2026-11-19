import Link from "next/link";
import { TitledSection } from "@/components/shared";
import type { ContentItem } from "@/types/content";
import { activityHref } from "@/utils/routes";

interface ActivityChipsProps {
  activities: ContentItem[];
}

/** "What we work on": one chip per programme. */
export function ActivityChips({ activities }: ActivityChipsProps) {
  return (
    <TitledSection title="What we work on">
      <div className="flex flex-wrap gap-3">
        {activities.map((activity) => (
          <Link key={activity.id} href={activityHref(activity.slug!)} className="glass rounded-full px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-soft transition hover:shadow-glow">
            {activity.title}
          </Link>
        ))}
      </div>
    </TitledSection>
  );
}
