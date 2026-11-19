import Image from "next/image";
import { TitledSection } from "@/components/shared";
import type { ContentItem } from "@/types/content";

interface PhotoMosaicProps {
  photos: ContentItem[];
}

/** "In pictures": the first photo large, the others small. */
export function PhotoMosaic({ photos }: PhotoMosaicProps) {
  return (
    <TitledSection title="In pictures">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {photos.map((photo, i) => (
          <figure key={photo.id} className={`reveal relative overflow-hidden rounded-3xl shadow-soft ${i === 0 ? "col-span-2 row-span-2 h-80 md:h-full" : "h-40"}`}>
            <Image src={photo.image!} alt={photo.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 hover:scale-110" />
            <figcaption className="glass absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs font-semibold text-brand-900">{photo.title}</figcaption>
          </figure>
        ))}
      </div>
    </TitledSection>
  );
}
