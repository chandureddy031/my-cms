import Image from "next/image";
import type { ContentItem } from "@/types/content";
import { DONATE_SECTION_ID } from "../constants";

interface WebsiteHeroProps {
  tagline: string;
  photos: string[];
  stats: ContentItem[];
}

/** Giant name, tagline, two actions, a photo strip and the headline numbers. */
export function WebsiteHero({ tagline, photos, stats }: WebsiteHeroProps) {
  return (
    <section id="top" className="pt-16 sm:pt-24">
      <div className="ws-x">
        <p className="ws-eyebrow">Anantapur, Andhra Pradesh · Since 1995</p>
        <h1 className="mt-6 font-display text-[clamp(4rem,15vw,11.5rem)] font-medium leading-[0.88] tracking-[-0.04em] text-ws-ink">
          APPLES<br />
          <span className="italic text-ws-accent">NGO</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-ws-muted sm:text-xl">{tagline}</p>
          <div className="flex shrink-0 gap-3">
            <a href={`#${DONATE_SECTION_ID}`} className="ws-button">Give today</a>
            <a href="#programmes" className="ws-button-ghost">Our work</a>
          </div>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="ws-x mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((src, i) => (
            <div key={src} className={i === 0 ? "relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl" : "relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-auto"}>
              <Image src={src} alt="" fill priority={i === 0} sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <dl className="ws-x mt-16 grid grid-cols-2 gap-y-10 pb-20 sm:grid-cols-4 sm:pb-28">
          {stats.map((stat) => (
            <div key={stat.id} className="border-l border-ws-line pl-5">
              <dd className="font-display text-4xl font-medium text-ws-ink sm:text-5xl">{stat.body}</dd>
              <dt className="mt-2 text-sm text-ws-muted">{stat.title}</dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
