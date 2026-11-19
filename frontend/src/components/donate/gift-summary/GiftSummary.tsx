import { Icon } from "@/components/ui";
import { formatInr } from "@/utils/format";
import { GIFT_PROMISES } from "../constants";

interface GiftSummaryProps {
  amount: number;
  cause: string;
  sending: boolean;
  error?: string;
}

/** Sticky summary of the gift with the submit button. */
export function GiftSummary({ amount, cause, sending, error }: GiftSummaryProps) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 p-8 text-white shadow-lift">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-200">Your gift</p>
        <p className="mt-3 font-display text-5xl font-bold">{formatInr(amount)}</p>
        <p className="mt-2 text-brand-50">to <strong>{cause}</strong></p>
        <ul className="mt-6 space-y-2 text-sm text-brand-50">
          {GIFT_PROMISES.map((promise) => (
            <li key={promise} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-200" />{promise}</li>
          ))}
        </ul>
        <button disabled={sending} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-semibold text-brand-800 shadow-soft transition hover:shadow-glow disabled:opacity-60">
          <Icon name="heart" /> {sending ? "Sending…" : `Donate ${formatInr(amount)}`}
        </button>
        {error && <p role="alert" className="mt-4 rounded-xl bg-white/15 p-3 text-center text-sm">{error}</p>}
      </div>
    </aside>
  );
}
