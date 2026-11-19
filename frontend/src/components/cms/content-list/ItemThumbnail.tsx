import Image from "next/image";
import { Avatar } from "@/components/ui";
import type { ContentItem, Section } from "@/types/content";
import { isPdf } from "@/utils/format";

interface ItemThumbnailProps {
  section: Section;
  item: ContentItem;
}

/** Avatar for people, the photo when there is one, otherwise the stat value or "Aa". */
export function ItemThumbnail({ section, item }: ItemThumbnailProps) {
  if (section === "caretakers") return <Avatar name={item.title} image={item.image} size="sm" />;
  if (item.image && !isPdf(item.image))
    return (
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
      </div>
    );
  return (
    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-bold text-brand-700">
      {section === "stats" ? item.body : "Aa"}
    </div>
  );
}
