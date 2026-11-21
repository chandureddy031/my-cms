import Link from "next/link";
import Board from "@/components/Board";
import PhotoMarquee from "@/components/PhotoMarquee";
import Photo from "@/components/Photo";
import { getContent } from "@/controller/content";
import { mixPhotos, photosIn } from "@/utils/photos";

export default function Home() {
  const { home, programmes } = getContent();
  return (
    <>
      {/* Open space so the full logo shows first; the boards below scroll over it. */}
      <section className="min-h-[75vh]" />

      <Board title="Who we are">
        <p className="max-w-4xl text-lg leading-relaxed">{home.whoWeAre}</p>
        <Link href="/about" className="btn-line mt-6">More about us</Link>
      </Board>

      <Board tone="dark">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {home.stats.map(({ value, label }) => (
            <div key={label}>
              <dd className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">{value}</dd>
              <dt className="mt-1 text-white/85">{label}</dt>
            </div>
          ))}
        </dl>
      </Board>

      <Board title="From the field" tone="tint">
        <PhotoMarquee photos={mixPhotos(programmes.map((p) => p.folder), 10)} />
      </Board>

      <Board title="Our work" intro={home.workIntro}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <Link key={p.slug} href={`/activities#${p.slug}`} className="group">
              <Photo src={photosIn(p.folder)[0]} className="aspect-[4/3]" />
              <span className="tag mt-3">{p.label}</span>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-orange-700">{p.title}</h3>
            </Link>
          ))}
        </div>
      </Board>

      <Board tone="dark" title={home.donateTitle} intro={home.donateText}>
        <Link href="/donate" className="btn">Donate</Link>
      </Board>
    </>
  );
}
