import { ActivityCard } from "@/components/activities";
import { HomeHero, PhotoMarquee, pickMarqueePhotos, StatsRow } from "@/components/home";
import { DonateBanner, PageCardGrid, SectionHeading } from "@/components/shared";
import { StoryCard } from "@/components/stories";
import { getSection, getSiteSettings } from "@/lib/api";

export default async function HomePage() {
  const [site, gallery, stats, activities, stories] = await Promise.all([
    getSiteSettings(), getSection("gallery"), getSection("stats"), getSection("activities"), getSection("stories"),
  ]);

  return (
    <>
      <HomeHero site={site} />
      <PhotoMarquee photos={pickMarqueePhotos(gallery)} />
      <StatsRow stats={stats} />

      <SectionHeading eyebrow="What we do" title="Six ways we change lives" className="pt-20" />
      <PageCardGrid>{activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}</PageCardGrid>

      <SectionHeading eyebrow="Real lives" title="Success stories" />
      <PageCardGrid>{stories.slice(0, 3).map((story) => <StoryCard key={story.id} story={story} />)}</PageCardGrid>

      <DonateBanner title="Your kindness reaches a real person." subtitle="Choose a cause and give in under a minute. Every rupee goes to the work you choose." />
    </>
  );
}
