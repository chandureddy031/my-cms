import Link from "next/link";
import { Icon } from "@/components/ui";
import { donateHref } from "@/utils/routes";

interface DonateBannerProps {
  title: string;
  subtitle: string;
  href?: string;
  label?: string;
}

/** Green call-to-action banner at the end of a page. */
export function DonateBanner({ title, subtitle, href = donateHref(), label = "Donate now" }: DonateBannerProps) {
  return (
    <section className="reveal page-mx my-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white shadow-lift md:p-14">
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-brand-50">{subtitle}</p>
      <Link href={href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-brand-800 shadow-soft transition hover:shadow-glow">
        {label} <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </section>
  );
}
