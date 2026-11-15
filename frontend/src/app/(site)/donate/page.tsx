import { getSection } from "@/lib/api";
import { PageHeader } from "@/components/ui";
import { DonateForm } from "@/components/DonateForm";

export const metadata = { title: "Donate" };

export default async function Donate({ searchParams }: { searchParams: Promise<{ cause?: string }> }) {
  const [{ cause }, activities] = await Promise.all([searchParams, getSection("activities")]);
  return (
    <>
      <PageHeader eyebrow="Give" title="Make a donation" sub="Choose a cause, pick an amount, and you're done. Every contribution reaches the people who need it." />
      <DonateForm causes={activities.map((a) => ({ slug: a.slug!, title: a.title, label: a.meta ?? a.title, image: a.image, body: a.body }))} initial={cause} />
    </>
  );
}
