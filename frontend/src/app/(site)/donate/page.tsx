import { DonationForm } from "@/components/donate";
import { PageHeader } from "@/components/shared";
import { causesFromActivities, getSection } from "@/lib/api";

export const metadata = { title: "Donate" };

interface DonatePageProps {
  searchParams: Promise<{ cause?: string }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const [{ cause }, activities] = await Promise.all([searchParams, getSection("activities")]);
  return (
    <>
      <PageHeader eyebrow="Give" title="Make a donation" subtitle="Choose a cause, pick an amount, and you're done. Every contribution reaches the people who need it." />
      <DonationForm causes={causesFromActivities(activities)} initialCause={cause} />
    </>
  );
}
