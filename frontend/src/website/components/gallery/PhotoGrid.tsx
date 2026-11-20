import Image from "next/image";
import type { ContentItem } from "@/types/content";

export function PhotoGrid({ photos }: { photos: ContentItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <li key={photo.id}>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={photo.image!} alt={photo.title} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-sm text-soil-body">{photo.title}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
