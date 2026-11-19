import type { ContentItem } from "@/types/content";
import { MarqueeSlide } from "./MarqueeSlide";

interface PhotoMarqueeProps {
  photos: ContentItem[];
}

/** Endless strip of photos that pauses on hover. The list is doubled so the loop is seamless. */
export function PhotoMarquee({ photos }: PhotoMarqueeProps) {
  const slides = photos.filter((photo) => photo.image);
  return (
    <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {[...slides, ...slides].map((photo, i) => <MarqueeSlide key={i} photo={photo} />)}
      </div>
    </div>
  );
}
