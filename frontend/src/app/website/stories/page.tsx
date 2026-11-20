import type { Metadata } from "next";
import { getSection } from "@/lib/api";
import { PageIntro, Section, StoryCard } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Case Studies" };

export default async function StoriesPage() {
  const stories = await getSection("stories");
  return (
    <>
      <PageIntro title="Case Studies" text="Real outcomes from our programmes in Anantapuramu district." />
      <Section><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{stories.map((s) => <StoryCard key={s.id} story={s} />)}</div></Section>
    </>
  );
}
