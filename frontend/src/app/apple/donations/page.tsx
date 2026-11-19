import { CauseTotals, CmsPageTitle, DonationsTable } from "@/components/cms";
import { requireAdminKey } from "@/lib/admin/session";
import { getDonations, totalOf, totalsByCause } from "@/lib/api";
import { formatInr } from "@/utils/format";

export default async function DonationsPage() {
  const donations = await getDonations(await requireAdminKey());
  return (
    <>
      <CmsPageTitle title="Donations" subtitle={`${donations.length} donations · ${formatInr(totalOf(donations))} total`} />
      <CauseTotals totals={totalsByCause(donations)} />
      <DonationsTable donations={donations} />
    </>
  );
}
