import Link from "next/link";
import { websiteRoutes } from "../../routes";

/** Closing call to give, used at the bottom of pages. */
export function CtaBand() {
  return (
    <section className="bg-soil-brand py-16 text-white">
      <div className="soil-x flex flex-wrap items-center justify-between gap-6">
        <h2 className="max-w-xl font-soil-head text-4xl font-medium leading-tight">Your gift reaches a real person in Anantapuramu</h2>
        <div className="flex gap-3">
          <Link href={websiteRoutes.donate} className="inline-flex rounded bg-white px-6 py-3 font-semibold text-soil-ink hover:bg-soil-band">Donate</Link>
          <Link href={websiteRoutes.contact} className="inline-flex rounded border border-white px-6 py-3 font-semibold hover:bg-white/10">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
