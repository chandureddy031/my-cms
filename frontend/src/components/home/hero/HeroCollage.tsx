import Image from "next/image";
import { COLLAGE_POSITIONS, HERO_PHOTOS } from "./constants";

/** Three overlapping photos in a fixed-size, centred box, so the layout is the same with the sidebar open or closed. Not clickable. */
export function HeroCollage() {
  return (
    <div className="relative mx-auto hidden h-[30rem] w-full max-w-[30rem] lg:block">
      {HERO_PHOTOS.map((photo, i) => (
        <div key={photo.image} className={`absolute overflow-hidden rounded-[2rem] ring-8 ring-white shadow-lift transition hover:z-10 hover:scale-105 ${COLLAGE_POSITIONS[i]}`}>
          <Image src={photo.image} alt={photo.caption} fill sizes="300px" className="object-cover" priority />
          <span className="pill absolute bottom-3 left-3">{photo.label}</span>
        </div>
      ))}
    </div>
  );
}
