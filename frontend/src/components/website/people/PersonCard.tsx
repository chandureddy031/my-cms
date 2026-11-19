import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { initialsOf, mailHref } from "@/utils/format";

/** Photo (or initials), name, role and email. */
export function PersonCard({ person }: { person: ContentItem }) {
  return (
    <article className="rounded-2xl border border-ws-line bg-ws-card p-6">
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-ws-paper">
        {person.image ? (
          <Image src={person.image} alt="" fill sizes="64px" className="object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center font-display text-xl text-ws-accent">{initialsOf(person.title)}</span>
        )}
      </div>
      <h3 className="mt-5 font-display text-xl font-medium text-ws-ink">{person.title}</h3>
      {person.meta && <p className="mt-1 text-sm text-ws-muted">{person.meta}</p>}
      {person.body && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ws-muted">{person.body}</p>}
      {person.email && <a href={mailHref(person.email)} className="mt-4 inline-block text-sm font-medium text-ws-ink underline decoration-ws-line underline-offset-4 hover:decoration-ws-ink">{person.email}</a>}
    </article>
  );
}
