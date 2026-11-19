import { formatInr } from "@/utils/format";

interface CauseTotalsProps {
  totals: [string, number][];
}

/** One small card per cause with its total. */
export function CauseTotals({ totals }: CauseTotalsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {totals.map(([cause, total]) => (
        <div key={cause} className="rounded-2xl border border-brand-100 bg-white px-5 py-3 shadow-soft">
          <p className="text-xs font-semibold text-gray-500">{cause}</p>
          <p className="font-display text-xl font-bold text-brand-700">{formatInr(total)}</p>
        </div>
      ))}
    </div>
  );
}
