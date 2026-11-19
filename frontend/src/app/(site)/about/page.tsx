import { ActivityChips, MissionVision, OrgValues, OurStory } from "@/components/about";
import { PersonCard } from "@/components/caretakers";
import { DonateBanner, PageCardGrid, PageHeader, SectionHeading } from "@/components/shared";
import { TEAM_GROUP } from "@/constants/content";
import { childrenOf, getSection, getSiteSettings } from "@/lib/api";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const [site, people, activities] = await Promise.all([getSiteSettings(), getSection("caretakers"), getSection("activities")]);
  return (
    <>
      <PageHeader eyebrow="About us" title={`Who we are at ${site.name}`} subtitle={site.about} />
      <MissionVision site={site} />
      <OrgValues />
      <OurStory />

      <SectionHeading eyebrow="Our people" title="The team behind the work" />
      <PageCardGrid>{childrenOf(people, TEAM_GROUP).map((person) => <PersonCard key={person.id} person={person} />)}</PageCardGrid>

      <ActivityChips activities={activities} />
      <DonateBanner title="Walk with us." subtitle="CSR partners, foundations, donors and volunteers — join hands with APPLES." />
    </>
  );
}
