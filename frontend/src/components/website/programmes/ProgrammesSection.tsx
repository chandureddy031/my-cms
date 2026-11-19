import type { ContentItem } from "@/types/content";
import { WebsiteSection } from "../shared/WebsiteSection";
import { ProgrammeCard } from "./ProgrammeCard";

export function ProgrammesSection({ activities }: { activities: ContentItem[] }) {
  return (
    <WebsiteSection id="programmes" eyebrow="What we do" title="Programmes rooted in the villages we serve." intro="Every programme is run with the community, for the community — and every one can be supported below.">
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((item, i) => <ProgrammeCard key={item.id} item={item} index={i} />)}
      </div>
    </WebsiteSection>
  );
}
