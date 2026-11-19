import Link from "next/link";
import type { ContentItem, Section } from "@/types/content";
import { cmsItemHref } from "@/utils/routes";
import { ItemThumbnail } from "./ItemThumbnail";

interface ContentListProps {
  section: Section;
  items: ContentItem[];
}

/** Every item of a section; each opens its editor. */
export function ContentList({ section, items }: ContentListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <Link href={cmsItemHref(section, item.id)} className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 lift">
            <ItemThumbnail section={section} item={item} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold group-hover:text-brand-700">{item.title}</p>
              <p className="truncate text-sm text-gray-500">{[item.meta, item.parent, item.slug && `/${item.slug}`].filter(Boolean).join(" · ") || item.body}</p>
            </div>
            <span className="hidden text-sm text-brand-600 opacity-0 transition group-hover:opacity-100 md:inline">Edit →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
