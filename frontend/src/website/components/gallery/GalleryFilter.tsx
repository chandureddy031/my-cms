import Link from "next/link";
import type { ContentItem } from "@/types/content";
import { cn } from "@/utils/cn";
import { galleryHref } from "../../routes";

/** Programme filter as links (?group=slug), so it works without JavaScript and can be shared. */
export function GalleryFilter({ programmes, active }: { programmes: ContentItem[]; active?: string }) {
  const tabs = [{ slug: undefined, label: "All" }, ...programmes.map((p) => ({ slug: p.slug ?? undefined, label: p.meta ?? p.title }))];
  return (
    <nav aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
      {tabs.map(({ slug, label }) => (
        <Link key={label} href={galleryHref(slug)} aria-current={active === slug ? "page" : undefined}
          className={cn("rounded border px-4 py-2 transition", active === slug ? "border-soil-brand bg-soil-brand text-white" : "border-soil-line bg-soil-paper hover:border-soil-ink")}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
