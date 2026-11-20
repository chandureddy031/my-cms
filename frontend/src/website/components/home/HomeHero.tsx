import Image from "next/image";
import Link from "next/link";
import { HERO } from "../../constants/content";
import { websiteRoutes } from "../../routes";

/** Headline and actions beside one clear photo (the photos are ~1400px, too small to fill the screen sharply). */
export function HomeHero() {
  return (
    <section className="bg-soil-band">
      <div className="soil-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h1 className="soil-h1">{HERO.title}</h1>
          <p className="soil-lead mt-6">{HERO.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={websiteRoutes.donate} className="soil-btn">Donate now</Link>
            <Link href={websiteRoutes.activities} className="soil-btn-line">See our work</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src={HERO.image} alt={HERO.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
