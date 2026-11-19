import Image from "next/image";
import { buttonClass } from "@/components/ui";
import type { ContentItem, Section } from "@/types/content";
import { isPdf } from "@/utils/format";
import { publicItemHref } from "@/utils/routes";

interface EditorPreviewProps {
  section: Section;
  item: Partial<ContentItem>;
}

/** Beside the form: the image or PDF, and the item's public page. */
export function EditorPreview({ section, item }: EditorPreviewProps) {
  const publicHref = publicItemHref[section];
  const wideOutline = buttonClass({ variant: "outline", className: "w-full" });
  return (
    <aside className="space-y-4">
      {isPdf(item.image) && <a href={item.image!} target="_blank" className={wideOutline}>Open PDF ↗</a>}
      {item.image && !isPdf(item.image) && (
        <div className="relative h-48 overflow-hidden rounded-3xl shadow-lift"><Image src={item.image} alt="" fill sizes="300px" className="object-cover" /></div>
      )}
      {item.slug && publicHref && <a href={publicHref(item.slug)} target="_blank" className={wideOutline}>View on site ↗</a>}
    </aside>
  );
}
