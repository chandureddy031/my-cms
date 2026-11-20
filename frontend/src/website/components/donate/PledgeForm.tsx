"use client";
import { DONATION_AMOUNTS } from "@/components/donate/constants";
import { useDonation } from "@/hooks/donations/useDonation";
import type { DonationCause } from "@/types/donation";
import { formatInr } from "@/utils/format";

interface PledgeFormProps {
  causes: DonationCause[];
  /** Slug of the programme to preselect (from ?cause=). */
  selected?: string;
}

/** Programme, amount and contact details; sent with the same hook as the main site's donate page. */
export function PledgeForm({ causes, selected }: PledgeFormProps) {
  const { status, error, submit } = useDonation();

  if (status === "done") {
    return (
      <div role="status" className="soil-card p-10 text-center">
        <p className="soil-h3">Thank you</p>
        <p className="mt-2 text-soil-body">Your pledge is recorded. Our team will call you to complete it.</p>
      </div>
    );
  }

  return (
    <form className="soil-card grid gap-6 p-7 sm:p-9" onSubmit={(event) => { event.preventDefault(); submit(event.currentTarget); }}>
      <label className="grid gap-2">
        <span className="font-semibold">Programme</span>
        <select name="cause" required className="soil-input" defaultValue={causes.find((c) => c.slug === selected)?.title}>
          {causes.map((cause) => <option key={cause.slug} value={cause.title}>{cause.title}</option>)}
        </select>
      </label>
      <fieldset className="grid gap-3">
        <legend className="mb-2 font-semibold">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {DONATION_AMOUNTS.map((amount, i) => (
            <label key={amount} className="cursor-pointer">
              <input type="radio" name="amount" value={amount} defaultChecked={i === 1} className="peer sr-only" />
              <span className="block rounded border-[1.5px] border-soil-line px-4 py-2 peer-checked:border-soil-brand peer-checked:bg-soil-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-soil-brand">
                {formatInr(amount)}
              </span>
            </label>
          ))}
        </div>
        <input name="custom" type="number" min={1} step={1} placeholder="Or another amount (₹)" className="soil-input" />
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required maxLength={120} autoComplete="name" placeholder="Your name" aria-label="Your name" className="soil-input" />
        <input name="email" type="email" required autoComplete="email" placeholder="Email" aria-label="Email" className="soil-input" />
      </div>
      <textarea name="message" rows={3} maxLength={1000} placeholder="A message (optional)" aria-label="Message" className="soil-input resize-none" />
      {status === "error" && <p role="alert" className="text-red-800">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="soil-btn w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Pledge my gift"}
      </button>
    </form>
  );
}
