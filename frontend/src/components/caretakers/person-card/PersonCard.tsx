import Link from "next/link";
import { Avatar, Icon } from "@/components/ui";
import type { ContentItem } from "@/types/content";
import { caretakerHref } from "@/utils/routes";

interface PersonCardProps {
  person: ContentItem;
}

/** Team member or caretaker; the whole card opens the profile. */
export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link href={caretakerHref(person.slug!)} className="reveal tile group flex flex-col items-center p-8 text-center lift">
      <Avatar name={person.title} image={person.image} />
      <h3 className="mt-5 font-display text-xl font-semibold">{person.title}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-600">{person.meta}</p>
      <p className="mt-3 text-sm text-gray-600">{person.body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        View profile <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
