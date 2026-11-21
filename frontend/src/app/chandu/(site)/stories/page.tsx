import type { Metadata } from "next";
import Board from "@/chandu/components/Board";
import Photo from "@/chandu/components/Photo";
import { getContent } from "@/chandu/controller/content";
import { photosIn } from "@/chandu/utils/photos";

export const metadata: Metadata = { title: "Case Studies" };

export default function StoriesPage() {
  const { stories, programmes } = getContent();
  return (
    <Board title="Case Studies" intro={stories.intro}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.items.map((story) => {
          // `programme` is a programme slug; its photo folder supplies the picture.
          const programme = programmes.find((p) => p.slug === story.programme);
          const photos = programme ? photosIn(programme.folder) : [];
          return (
            <article key={story.title}>
              {photos.length > 0 && <Photo src={photos[1] ?? photos[0]} className="aspect-[4/3]" />}
              {programme && <span className="tag mt-4">{programme.label}</span>}
              <h3 className="mt-2 text-xl font-semibold">{story.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{story.text}</p>
            </article>
          );
        })}
      </div>
    </Board>
  );
}
