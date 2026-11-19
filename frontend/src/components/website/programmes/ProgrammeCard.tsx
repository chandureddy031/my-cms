import Image from "next/image";
import type { ContentItem } from "@/types/content";

/** Photo, number, label and summary of one programme. */
export function ProgrammeCard({ item, index }: { item: ContentItem; index: number }) {
  return (
    <article className="group">
      {item.image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
      )}
      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-ws-muted">
        {String(index + 1).padStart(2, "0")} · {item.meta ?? ""}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium text-ws-ink">{item.title}</h3>
      <p className="mt-3 leading-relaxed text-ws-muted">{item.body}</p>
    </article>
  );
}
