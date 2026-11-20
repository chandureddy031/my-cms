import type { ContentItem } from "@/types/content";

/** Headline numbers from the CMS "stats" section (title = label, body = number). */
export function StatsRow({ stats }: { stats: ContentItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id}>
          <dd className="font-soil-head text-5xl text-soil-brand">{stat.body}</dd>
          <dt className="mt-1 text-soil-body">{stat.title}</dt>
        </div>
      ))}
    </dl>
  );
}
