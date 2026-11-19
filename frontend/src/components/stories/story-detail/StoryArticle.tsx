import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/shared";
import type { ContentItem } from "@/types/content";
import { activityHref } from "@/utils/routes";

interface StoryArticleProps {
  story: ContentItem;
}

/** Photo beside the story, with a link to the programme it came from. */
export function StoryArticle({ story }: StoryArticleProps) {
  return (
    <article className="page-x grid gap-10 py-8 lg:grid-cols-2">
      {story.image && (
        <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-lift lg:sticky lg:top-6 lg:h-[32rem]">
          <Image src={story.image} alt="" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </div>
      )}
      <div>
        <span className="pill shadow-soft">{story.meta}</span>
        <h1 className="text-shine mt-4 font-display text-5xl font-bold">{story.title}</h1>
        <p className="mt-4 font-display text-xl text-brand-900">{story.body}</p>
        <div className="mt-8 border-l-4 border-brand-400 pl-6"><RichText text={story.details || story.body} /></div>
        {story.parent && <Link href={activityHref(story.parent)} className="text-link mt-8 inline-block">Learn about {story.meta} →</Link>}
      </div>
    </article>
  );
}
