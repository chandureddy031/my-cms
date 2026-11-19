import { CmsNotice, CmsPageTitle, DashboardTiles, UnlockForm } from "@/components/cms";
import { SECTIONS } from "@/constants/content";
import { readAdminKey } from "@/lib/admin/session";
import { getDonations, getSection, totalOf } from "@/lib/api";

interface DashboardPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { error } = await searchParams;
  const adminKey = await readAdminKey();
  if (!adminKey) return <UnlockForm error={error} />;

  const [donations, ...sections] = await Promise.all([getDonations(adminKey), ...SECTIONS.map((section) => getSection(section, { fresh: true }))]);
  return (
    <>
      <CmsPageTitle title="Dashboard" subtitle="Pick what you want to change. Every save goes live on the website immediately." />
      <CmsNotice error={error} />
      <DashboardTiles
        donationTotal={totalOf(donations)}
        donationCount={donations.length}
        sectionCounts={SECTIONS.map((section, i) => ({ section, count: sections[i].length }))}
      />
    </>
  );
}
