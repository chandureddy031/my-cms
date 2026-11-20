import Link from "next/link";
import { Icon, Logo } from "@/components/ui";
import type { SiteSettings } from "@/types/site";
import { activitiesHref, donateHref } from "@/utils/routes";
import { HeroCollage } from "./HeroCollage";

interface HomeHeroProps {
  site: SiteSettings;
}

/** Name, tagline, intro, the two main buttons and the photo collage. */
export function HomeHero({ site }: HomeHeroProps) {
  return (
    <section className="page-x relative grid items-center gap-10 overflow-hidden pb-6 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
      <div aria-hidden className="absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-brand-200/50 blur-3xl" />
      <div className="relative">
        <h1 className="flex flex-wrap items-center gap-x-[0.3em] font-display text-5xl font-bold leading-[1.05] md:text-6xl 2xl:text-7xl">
          <Logo name={site.name} /><span className="text-shine">NGO</span>
        </h1>
        <p className="mt-5 font-display text-2xl text-brand-900 md:text-3xl">{site.tagline}</p>
        <p className="mt-5 max-w-xl text-gray-600">{site.about}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={donateHref()} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 font-semibold text-white shadow-glow transition hover:brightness-110">
            <Icon name="heart" /> Donate
          </Link>
          <Link href={activitiesHref()} className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-brand-800 shadow-soft transition hover:shadow-lift">
            Explore our work <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <HeroCollage />
    </section>
  );
}
