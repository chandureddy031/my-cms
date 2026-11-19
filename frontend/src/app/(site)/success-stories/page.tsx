import { PageCardGrid, PageHeader } from "@/components/shared";
import { StoryCard } from "@/components/stories";
import { getSection } from "@/lib/api";

export const metadata = { title: "Success Stories" };

export default async function StoriesPage() {
  const stories = await getSection("stories");
  return (
    <>
      <PageHeader eyebrow="Real lives" title="Success Stories" subtitle="Real results from our programmes in Anantapur district." />
      <PageCardGrid>{stories.map((story) => <StoryCard key={story.id} story={story} />)}</PageCardGrid>
    </>
  );
}
