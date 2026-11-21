import Photo from "@/components/Photo";

/** Photos sliding sideways in an endless loop; pauses on hover, stops for reduced motion. */
export default function PhotoMarquee({ photos }: { photos: string[] }) {
  return (
    <div className="marquee overflow-hidden" aria-label="Photos from our programmes">
      <ul className="marquee-track flex w-max gap-4">
        {[...photos, ...photos].map((src, i) => (
          <li key={i} aria-hidden={i >= photos.length}>
            <Photo src={src} className="h-52 w-72" sizes="288px" />
          </li>
        ))}
      </ul>
    </div>
  );
}
