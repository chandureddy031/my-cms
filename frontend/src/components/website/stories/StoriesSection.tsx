import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { WebsiteSection } from "../shared/WebsiteSection";

/** Real stories, alternating photo and text. */
export function StoriesSection({ stories }: { stories: ContentItem[] }) {
  return (
    <WebsiteSection id="stories" eyebrow="Stories of change" title="Real lives, changed by your support." className="bg-ws-card">
      <div className="space-y-16">
        {stories.map((story, i) => (
          <article key={story.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            {story.image && (
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={story.image} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
            )}
            <div>
              {story.meta && <p className="ws-eyebrow">{story.meta}</p>}
              <h3 className="mt-3 font-display text-3xl font-medium leading-snug text-ws-ink">{story.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ws-muted">{story.body}</p>
            </div>
          </article>
        ))}
      </div>
    </WebsiteSection>
  );
}
