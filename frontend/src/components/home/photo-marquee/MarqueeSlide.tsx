import Image from "next/image";
import type { ContentItem } from "@/types/content";

interface MarqueeSlideProps {
  photo: ContentItem;
}

/** One photo in the marquee with its caption. */
export function MarqueeSlide({ photo }: MarqueeSlideProps) {
  return (
    <div className="relative h-64 w-96 shrink-0 overflow-hidden rounded-3xl shadow-lift">
      <Image src={photo.image!} alt={photo.title} fill sizes="384px" className="object-cover" />
      <span className="glass absolute bottom-3 left-3 rounded-full px-4 py-1.5 text-sm font-semibold text-brand-900">{photo.title}</span>
    </div>
  );
}
