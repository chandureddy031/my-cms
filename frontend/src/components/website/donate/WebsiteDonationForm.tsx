"use client";
import { DONATION_AMOUNTS } from "@/components/donate/constants";
import { useDonation } from "@/hooks/donations/useDonation";
import type { DonationCause } from "@/types/donation";
import { formatInr } from "@/utils/format";

/** Cause, amount, details — one form, sent with the same hook as /donate. */
export function WebsiteDonationForm({ causes }: { causes: DonationCause[] }) {
  const { status, error, submit } = useDonation();

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-ws-line bg-ws-card p-10 text-center">
        <p className="font-display text-3xl text-ws-ink">Thank you.</p>
        <p className="mt-3 text-ws-muted">Your pledge is recorded. Our team will contact you to complete it.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-8 rounded-3xl border border-ws-line bg-ws-card p-6 sm:p-10"
      onSubmit={(event) => {
        event.preventDefault();
        submit(event.currentTarget);
      }}
    >
      <label className="block">
        <span className="text-sm font-medium text-ws-ink">Programme</span>
        <select name="cause" required className="ws-input mt-2">
          {causes.map((cause) => <option key={cause.slug} value={cause.title}>{cause.title}</option>)}
        </select>
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-ws-ink">Amount</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DONATION_AMOUNTS.map((amount, i) => (
            <label key={amount} className="cursor-pointer">
              <input type="radio" name="amount" value={amount} defaultChecked={i === 1} className="peer sr-only" />
              <span className="block rounded-full border border-ws-line px-5 py-2.5 text-sm text-ws-ink transition peer-checked:border-ws-ink peer-checked:bg-ws-ink peer-checked:text-ws-paper peer-focus-visible:ring-2 peer-focus-visible:ring-ws-ink/30">
                {formatInr(amount)}
              </span>
            </label>
          ))}
        </div>
        <input name="custom" type="number" min="1" step="1" placeholder="Or another amount (₹)" className="ws-input mt-3" />
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Your name" autoComplete="name" className="ws-input" />
        <input name="email" type="email" required placeholder="Email" autoComplete="email" className="ws-input" />
      </div>
      <textarea name="message" maxLength={1000} rows={3} placeholder="A message (optional)" className="ws-input resize-none" />

      {status === "error" && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="ws-button w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Pledge my gift"}
      </button>
    </form>
  );
}
