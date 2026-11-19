import type { ContentItem } from "@/types/content";
import { StatCard } from "./StatCard";

interface StatsRowProps {
  stats: ContentItem[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <section className="page-x grid grid-cols-2 gap-5 md:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
    </section>
  );
}
