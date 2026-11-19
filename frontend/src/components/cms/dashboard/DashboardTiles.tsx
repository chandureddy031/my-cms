import { SECTION_ICONS, SECTION_LABELS } from "@/constants/cms";
import type { Section } from "@/types/content";
import { cmsSectionHref, cmsSettingsHref } from "@/utils/routes";
import { DashboardTile } from "./DashboardTile";
import { DonationsTotalTile } from "./DonationsTotalTile";

interface DashboardTilesProps {
  donationTotal: number;
  donationCount: number;
  sectionCounts: { section: Section; count: number }[];
}

/** Donations total, one tile per content section, and site settings. */
export function DashboardTiles({ donationTotal, donationCount, sectionCounts }: DashboardTilesProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <DonationsTotalTile total={donationTotal} count={donationCount} />
      {sectionCounts.map(({ section, count }) => (
        <DashboardTile key={section} href={cmsSectionHref(section)} icon={SECTION_ICONS[section]} title={SECTION_LABELS[section]} note={<>{count} items · edit →</>} />
      ))}
      <DashboardTile href={cmsSettingsHref()} icon="info" title="Site settings" note="Name, tagline, About text, contact →" />
    </div>
  );
}
