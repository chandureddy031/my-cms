import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { PHOTO_HEIGHTS } from "./constants";

interface PhotoWallProps {
  photos: ContentItem[];
}

/** Masonry of an album's photos with captions; each photo opens full size. */
export function PhotoWall({ photos }: PhotoWallProps) {
  return (
    <div className="page-x columns-1 gap-6 pb-10 sm:columns-2 xl:columns-3">
      {photos.map((photo, i) => (
        <figure key={photo.id} className="reveal tile mb-6 break-inside-avoid overflow-hidden lift">
          <a href={photo.image!} target="_blank" rel="noreferrer" className={`relative block overflow-hidden ${PHOTO_HEIGHTS[i % PHOTO_HEIGHTS.length]}`}>
            <Image src={photo.image!} alt={photo.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-105" />
          </a>
          <figcaption className="p-5">
            <p className="font-display text-lg font-semibold">{photo.title}</p>
            {photo.body && <p className="mt-1 text-sm text-gray-600">{photo.body}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
