import { getSection } from "@/lib/api";
import { Grid, PageHeader, PersonCard } from "@/components/ui";

export const metadata = { title: "Caretakers" };

export default async function Caretakers() {
  const people = await getSection("caretakers");
  return (
    <>
      <PageHeader eyebrow="Our people" title="Caretakers" sub="The people who make it happen every day. Open a profile to learn about them and get in touch." />
      <Grid>{people.map((p) => <PersonCard key={p.id} p={p} />)}</Grid>
    </>
  );
}
