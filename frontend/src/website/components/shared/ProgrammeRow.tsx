import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "@/types/content";
import { donateHref, galleryHref } from "../../routes";

/** One programme as a list row: photo, label, title, summary and two links. */
export function ProgrammeRow({ programme }: { programme: ContentItem }) {
  return (
    <article className="grid gap-6 border-b border-soil-line py-8 sm:grid-cols-[16rem_1fr] sm:gap-10">
      {programme.image && (
        <div className="relative aspect-[3/2] overflow-hidden rounded-md">
          <Image src={programme.image} alt="" fill sizes="(max-width:640px) 100vw, 256px" className="object-cover" />
        </div>
      )}
      <div>
        {programme.meta && <span className="soil-tag">{programme.meta}</span>}
        <h3 className="soil-h3 mt-3">{programme.title}</h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-soil-body">{programme.body}</p>
        {programme.slug && (
          <div className="mt-4 flex gap-6">
            <Link href={galleryHref(programme.slug)} className="soil-link">See photos</Link>
            <Link href={donateHref(programme.slug)} className="soil-link">Support this</Link>
          </div>
        )}
      </div>
    </article>
  );
}
