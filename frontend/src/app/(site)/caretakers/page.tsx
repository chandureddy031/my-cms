import { PersonCard } from "@/components/caretakers";
import { PageCardGrid, PageHeader } from "@/components/shared";
import { getSection } from "@/lib/api";

export const metadata = { title: "Caretakers" };

export default async function CaretakersPage() {
  const people = await getSection("caretakers");
  return (
    <>
      <PageHeader eyebrow="Our people" title="Caretakers" subtitle="The people who make it happen every day. Open a profile to learn about them and get in touch." />
      <PageCardGrid>{people.map((person) => <PersonCard key={person.id} person={person} />)}</PageCardGrid>
    </>
  );
}
