import Image from "next/image";

/** Photos sliding sideways in an endless loop; pauses on hover and stops for reduced motion. */
export function PhotoMarquee({ photos }: { photos: string[] }) {
  if (!photos.length) return null;
  return (
    <div className="soil-marquee overflow-hidden py-2" aria-label="Photos from our programmes">
      <ul className="soil-marquee-track flex w-max gap-4">
        {[...photos, ...photos].map((src, i) => (
          <li key={i} aria-hidden={i >= photos.length} className="relative h-52 w-64 shrink-0 overflow-hidden rounded-md sm:h-60 sm:w-72">
            <Image src={src} alt="" fill sizes="288px" className="object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}
