import { StepLegend } from "../step-legend/StepLegend";

const FIELD_CLASS = "w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-soft transition focus:border-brand-400 focus:shadow-glow focus:outline-none";

/** Step 3: name, email and an optional message. */
export function DonorDetails() {
  return (
    <fieldset>
      <StepLegend step={3}>Your details</StepLegend>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Full name" aria-label="Full name" autoComplete="name" className={FIELD_CLASS} />
        <input name="email" type="email" required placeholder="Email" aria-label="Email" autoComplete="email" className={FIELD_CLASS} />
        <textarea name="message" rows={3} maxLength={1000} placeholder="A message for the team (optional)" aria-label="Message" className={`${FIELD_CLASS} sm:col-span-2`} />
      </div>
    </fieldset>
  );
}
