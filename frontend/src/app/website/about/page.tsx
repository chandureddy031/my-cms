import type { Metadata } from "next";
import { getSection, getSiteSettings } from "@/lib/api";
import { PageIntro, PersonCard, Section, splitPeople, VisionMission } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const [site, people] = await Promise.all([getSiteSettings(), getSection("caretakers")]);
  const { team, caretakers } = splitPeople(people);
  return (
    <>
      <PageIntro title="About APPLES" text="A community-centred society serving Anantapuramu district since 1995." />
      <Section><VisionMission site={site} /></Section>
      <Section title="Our Team">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{team.map((p) => <PersonCard key={p.id} person={p} />)}</div>
        {caretakers.length > 0 && (
          <>
            <h3 className="soil-h3 mt-14">Caretakers</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{caretakers.map((p) => <PersonCard key={p.id} person={p} />)}</div>
          </>
        )}
      </Section>
    </>
  );
}
