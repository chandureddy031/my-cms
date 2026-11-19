import type { DonationCause } from "@/types/donation";
import { DONATE_SECTION_ID } from "../constants";
import { WebsiteDonationForm } from "./WebsiteDonationForm";

const PROMISES = ["Goes directly to the programme you choose", "Audited and reported every year", "Our team contacts you to complete it"];

/** Why give, beside the form. */
export function DonateSection({ causes }: { causes: DonationCause[] }) {
  return (
    <section id={DONATE_SECTION_ID} className="bg-ws-ink py-20 text-ws-paper sm:py-28">
      <div className="ws-x grid gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ws-paper/60">Donate</p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-tight tracking-tight sm:text-6xl">A small gift, a real change.</h2>
          <ul className="mt-10 space-y-4 text-ws-paper/75">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex gap-3 border-t border-ws-paper/15 pt-4">— {promise}</li>
            ))}
          </ul>
        </div>
        <WebsiteDonationForm causes={causes} />
      </div>
    </section>
  );
}
