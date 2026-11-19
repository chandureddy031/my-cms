import Link from "next/link";
import type { ContentItem } from "@/types/content";
import { albumHref, donateHref } from "@/utils/routes";

interface SupportAsideProps {
  activity: ContentItem;
  photoCount: number;
}

/** Sticky side box: give to this programme, and open its album. */
export function SupportAside({ activity, photoCount }: SupportAsideProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
      <div className="panel-brand rounded-3xl p-7 shadow-glow">
        <p className="font-display text-2xl font-bold">Support {activity.meta}</p>
        <p className="mt-2 text-sm text-brand-50">Your gift goes directly to this programme.</p>
        <Link href={donateHref(activity.slug!)} className="mt-5 block rounded-full bg-white py-3 text-center font-semibold text-brand-800 shadow-soft hover:shadow-lift">
          Donate to this cause
        </Link>
      </div>
      {photoCount > 0 && (
        <Link href={albumHref(activity.slug!)} className="tile block p-5 text-center text-sm font-semibold text-brand-700 lift">
          View all {photoCount} photos →
        </Link>
      )}
    </aside>
  );
}
