import type { ContentItem } from "@/types/content";

interface StatCardProps {
  stat: ContentItem;
}

/** A headline number (body = value, title = label). */
export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="reveal glass rounded-3xl p-7 text-center shadow-soft transition hover:shadow-glow">
      <p className="text-shine font-display text-4xl font-bold">{stat.body}</p>
      <p className="mt-1 text-sm font-semibold text-gray-600">{stat.title}</p>
    </div>
  );
}
