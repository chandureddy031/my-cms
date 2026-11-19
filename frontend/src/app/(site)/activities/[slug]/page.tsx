import { notFound } from "next/navigation";
import { ActivityHero, PhotoMosaic, SupportAside } from "@/components/activities";
import { CardGrid, DonateBanner, RichTextPanel, TitledSection } from "@/components/shared";
import { StoryCard } from "@/components/stories";
import { childrenOf, getBySlug, getSection } from "@/lib/api";
import { donateHref } from "@/utils/routes";

interface ActivityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ActivityPageProps) {
  return { title: (await getBySlug("activities", (await params).slug))?.title ?? "Activity" };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const [activity, gallery, stories] = await Promise.all([getBySlug("activities", slug), getSection("gallery"), getSection("stories")]);
  if (!activity) notFound();
  const photos = childrenOf(gallery, slug);
  const relatedStories = childrenOf(stories, slug);

  return (
    <>
      <ActivityHero activity={activity} />
      <div className="page-x grid gap-10 py-14 lg:grid-cols-[1fr_20rem]">
        <RichTextPanel text={activity.details || activity.body} />
        <SupportAside activity={activity} photoCount={photos.length} />
      </div>
      {photos.length > 0 && <PhotoMosaic photos={photos} />}
      {relatedStories.length > 0 && (
        <TitledSection title="Stories from this programme" className="pt-16">
          <CardGrid>{relatedStories.map((story) => <StoryCard key={story.id} story={story} />)}</CardGrid>
        </TitledSection>
      )}
      <DonateBanner title={`Help us grow ${activity.meta}.`} subtitle="Pick an amount that feels right. We will tell you what it achieved." href={donateHref(slug)} />
    </>
  );
}
