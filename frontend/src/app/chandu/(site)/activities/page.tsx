import type { Metadata } from "next";
import Link from "next/link";
import Board from "@/chandu/components/Board";
import Photo from "@/chandu/components/Photo";
import { photosIn } from "@/chandu/utils/photos";
import { getContent } from "@/chandu/controller/content";

export const metadata: Metadata = { title: "Activities" };

export default function ActivitiesPage() {
  const { activities, programmes } = getContent();
  return (
    <>
      <Board tone="dark" title="Our Activities" intro={activities.intro} />
      {programmes.map((p, i) => (
        <Board key={p.slug} id={p.slug} tone={i % 2 ? "tint" : "white"}>
          <div className="grid gap-8 md:grid-cols-[20rem_1fr]">
            <Photo src={photosIn(p.folder)[0]} className="aspect-[4/3]" sizes="(max-width:768px) 100vw, 320px" />
            <div>
              <span className="tag">{p.label}</span>
              <h2 className="mt-3 text-3xl font-bold grad-text">{p.title}</h2>
              <p className="mt-3 text-lg leading-relaxed">{p.text}</p>
              <Link href={`/chandu/gallery?group=${p.slug}`} className="btn-line mt-6">See photos</Link>
            </div>
          </div>
        </Board>
      ))}
    </>
  );
}
