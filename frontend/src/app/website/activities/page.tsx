import type { Metadata } from "next";
import { getSection } from "@/lib/api";
import { PageIntro, ProgrammeRow, Section } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Activities" };

export default async function ActivitiesPage() {
  const activities = await getSection("activities");
  return (
    <>
      <PageIntro title="Our Activities" text="Health, education, disability, elderly people and caregiver support, livelihoods and natural farming." />
      <Section><div className="border-t border-soil-line">{activities.map((p) => <ProgrammeRow key={p.id} programme={p} />)}</div></Section>
    </>
  );
}
