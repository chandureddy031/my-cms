import type { Metadata } from "next";
import { causesFromActivities, getSection, getSiteSettings } from "@/lib/api";
import { telHref } from "@/utils/format";
import { DONATE_PROMISES, PageIntro, PledgeForm, Section } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Donate" };

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ cause?: string }> }) {
  const [{ cause }, activities, site] = await Promise.all([searchParams, getSection("activities"), getSiteSettings()]);
  return (
    <>
      <PageIntro title="Donate" text="Choose a programme and an amount. Our team calls you to complete the gift." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <ul className="grid gap-4">
              {DONATE_PROMISES.map((promise) => <li key={promise} className="border-b border-soil-line pb-4">{promise}</li>)}
            </ul>
            <p className="mt-8 text-soil-body">Questions about giving? Call <a href={telHref(site.phone)} className="soil-link">{site.phone}</a></p>
          </div>
          <PledgeForm causes={causesFromActivities(activities)} selected={cause} />
        </div>
      </Section>
    </>
  );
}
