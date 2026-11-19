import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { GALLERY_LIMIT } from "../constants";
import { WebsiteSection } from "../shared/WebsiteSection";

/** A grid of field photos with their captions. */
export function GallerySection({ photos }: { photos: ContentItem[] }) {
  return (
    <WebsiteSection id="gallery" eyebrow="Gallery" title="Moments from the field.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.slice(0, GALLERY_LIMIT).map((photo) => (
          <figure key={photo.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={photo.image!} alt={photo.title} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ws-ink/75 to-transparent p-3 pt-10 text-xs text-ws-paper opacity-0 transition group-hover:opacity-100">
              {photo.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </WebsiteSection>
  );
}
