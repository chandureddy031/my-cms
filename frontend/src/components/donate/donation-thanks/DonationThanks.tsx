import { ButtonLink } from "@/components/ui";
import { formatInr } from "@/utils/format";
import { homeHref } from "@/utils/routes";

interface DonationThanksProps {
  amount: number;
  cause: string;
}

/** After a successful donation, before going back home. */
export function DonationThanks({ amount, cause }: DonationThanksProps) {
  return (
    <div role="status" className="page-mx glass mb-16 rounded-[2rem] px-6 py-16 text-center shadow-lift">
      <div className="mx-auto flex h-24 w-24 animate-float items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-5xl text-white shadow-glow">✓</div>
      <h2 className="text-shine mt-8 font-display text-4xl font-bold">Donation sent successfully!</h2>
      <p className="mt-3 text-gray-600">Thank you for giving {formatInr(amount)} to {cause}. Taking you back to the home page…</p>
      <ButtonLink href={homeHref()} size="xl" className="mt-8">Go to Home now</ButtonLink>
    </div>
  );
}
