import { getSection } from "@/lib/api";
import { Card, Grid, PageHeader } from "@/components/ui";

export const metadata = { title: "Success Stories" };

export default async function Stories() {
  const items = await getSection("stories");
  return (
    <>
      <PageHeader eyebrow="Real lives" title="Success Stories" sub="Real results from our programmes in Anantapur district." />
      <Grid>{items.map((s) => <Card key={s.id} item={s} href={`/success-stories/${s.slug}`} cta="Read story" />)}</Grid>
    </>
  );
}
