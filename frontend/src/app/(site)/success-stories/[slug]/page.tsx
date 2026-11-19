import { notFound } from "next/navigation";
import { BackLinkBar, CardGrid, DonateBanner, TitledSection } from "@/components/shared";
import { StoryArticle, StoryCard } from "@/components/stories";
import { getBySlug, getSection } from "@/lib/api";
import { storiesHref } from "@/utils/routes";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps) {
  return { title: (await getBySlug("stories", (await params).slug))?.title ?? "Story" };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const [story, stories] = await Promise.all([getBySlug("stories", slug), getSection("stories")]);
  if (!story) notFound();
  return (
    <>
      <BackLinkBar href={storiesHref()} label="All stories" />
      <StoryArticle story={story} />
      <TitledSection title="More stories" className="pt-8">
        <CardGrid>{stories.filter((other) => other.slug !== slug).slice(0, 3).map((other) => <StoryCard key={other.id} story={other} />)}</CardGrid>
      </TitledSection>
      <DonateBanner title="Write the next story with us." subtitle="One donation can be the turning point in someone's life." />
    </>
  );
}
