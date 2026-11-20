import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { initialsOf, mailHref } from "@/utils/format";

/** Photo or initials, name, role and a short note. */
export function PersonCard({ person }: { person: ContentItem }) {
  return (
    <article className="soil-card p-6 text-center">
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full bg-soil-soft">
        {person.image ? (
          <Image src={person.image} alt="" fill sizes="80px" className="object-cover" />
        ) : (
          <span className="grid h-full place-items-center font-soil-head text-2xl text-soil-ink">{initialsOf(person.title)}</span>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-soil-ink">{person.title}</h3>
      {person.meta && <p className="text-sm text-soil-body">{person.meta}</p>}
      {person.body && <p className="mt-3 text-sm leading-relaxed text-soil-body">{person.body}</p>}
      {person.email && <a href={mailHref(person.email)} className="soil-link mt-3 inline-block text-sm">Email</a>}
    </article>
  );
}
