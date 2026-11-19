import Link from "next/link";
import { formatInr } from "@/utils/format";
import { cmsDonationsHref } from "@/utils/routes";

interface DonationsTotalTileProps {
  total: number;
  count: number;
}

/** Wide green tile with the donations total. */
export function DonationsTotalTile({ total, count }: DonationsTotalTileProps) {
  return (
    <Link href={cmsDonationsHref()} className="panel-brand rounded-3xl p-7 shadow-glow transition hover:-translate-y-1 sm:col-span-2">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-100">Donations</p>
      <p className="mt-2 font-display text-5xl font-bold">{formatInr(total)}</p>
      <p className="mt-1 text-brand-50">{count} donations · view all →</p>
    </Link>
  );
}
