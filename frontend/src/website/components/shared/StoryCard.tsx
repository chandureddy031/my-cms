import Image from "next/image";
import type { ContentItem } from "@/types/content";

/** A live story: photo, programme, outcome and one-paragraph account. */
export function StoryCard({ story }: { story: ContentItem }) {
  return (
    <article className="soil-card">
      {story.image && (
        <div className="relative aspect-[4/3]">
          <Image src={story.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
        </div>
      )}
      <div className="p-6">
        {story.meta && <span className="soil-tag">{story.meta}</span>}
        <h3 className="soil-h3 mt-3 text-xl">{story.title}</h3>
        <p className="mt-2 leading-relaxed text-soil-body">{story.body}</p>
      </div>
    </article>
  );
}
