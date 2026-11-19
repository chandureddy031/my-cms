import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import type { ContentItem } from "@/types/content";

interface PhotoCardProps {
  item: ContentItem;
  href: string;
  linkLabel: string;
}

/** Photo, label, title and summary. Only the link at the bottom navigates, not the photo. */
export function PhotoCard({ item, href, linkLabel }: PhotoCardProps) {
  return (
    <article className="reveal tile group block overflow-hidden lift">
      {item.image && (
        <div className="relative h-56 overflow-hidden">
          <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent" />
          {item.meta && <span className="pill absolute left-4 top-4">{item.meta}</span>}
        </div>
      )}
      <div className="p-6">
        {!item.image && item.meta && <span className="meta-label">{item.meta}</span>}
        <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.title}</h3>
        {item.body && <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>}
        <Link href={href} className="group/link mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
          {linkLabel} <Icon name="arrow" className="h-4 w-4 transition group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
