import Link from "next/link";
import { getSection } from "@/lib/api";
import { HomeHero, marqueePhotos, PhotoMarquee, ProgrammeRow, Section, StatsRow, StoryCard, websiteRoutes } from "@/website";

export const revalidate = 60;

export default async function WebsiteHome() {
  const [stats, activities, stories, gallery] = await Promise.all([getSection("stats"), getSection("activities"), getSection("stories"), getSection("gallery")]);
  return (
    <>
      <HomeHero />
      <div className="soil-x py-16"><StatsRow stats={stats.slice(0, 4)} /></div>
      <PhotoMarquee photos={marqueePhotos(gallery)} />
      <Section title="Our Activities" text="Six programmes, run with the community." action={<Link href={websiteRoutes.activities} className="soil-link">All activities</Link>}>
        <div className="border-t border-soil-line">{activities.slice(0, 3).map((p) => <ProgrammeRow key={p.id} programme={p} />)}</div>
      </Section>
      <Section band title="Case Studies" action={<Link href={websiteRoutes.stories} className="soil-link">All case studies</Link>}>
        <div className="grid gap-7 md:grid-cols-3">{stories.slice(0, 3).map((s) => <StoryCard key={s.id} story={s} />)}</div>
      </Section>
    </>
  );
}
