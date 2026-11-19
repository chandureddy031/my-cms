import Image from "next/image";
import { BackLink } from "@/components/shared";
import type { ContentItem } from "@/types/content";
import { activitiesHref } from "@/utils/routes";

interface ActivityHeroProps {
  activity: ContentItem;
}

/** Wide cover photo with the programme's label, title and summary. */
export function ActivityHero({ activity }: ActivityHeroProps) {
  return (
    <section className="page-mx relative mt-6 h-[26rem] overflow-hidden rounded-[2rem] shadow-lift">
      {activity.image && <Image src={activity.image} alt="" fill priority sizes="100vw" className="object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
      <div className="absolute left-4 top-4"><span className="glass inline-block rounded-full"><BackLink href={activitiesHref()} label="All activities" /></span></div>
      <div className="absolute bottom-0 p-8 text-white md:p-12">
        <span className="pill">{activity.meta}</span>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">{activity.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">{activity.body}</p>
      </div>
    </section>
  );
}
