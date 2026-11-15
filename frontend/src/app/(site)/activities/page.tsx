import { getSection } from "@/lib/api";
import { Card, Grid, PageHeader } from "@/components/ui";

export const metadata = { title: "Activities" };

export default async function Activities() {
  const items = await getSection("activities");
  return (
    <>
      <PageHeader eyebrow="Our work" title="Activities" sub="Elder care, education, health, disability wellbeing, careers and agriculture. Open any programme to see exactly what we do and how." />
      <Grid>{items.map((a) => <Card key={a.id} item={a} href={`/activities/${a.slug}`} cta="See how we work" />)}</Grid>
    </>
  );
}
