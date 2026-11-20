import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api";
import { mailHref } from "@/utils/format";
import { ContactDetails, PageIntro, Section } from "@/website";

export const revalidate = 60;
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const site = await getSiteSettings();
  return (
    <>
      <PageIntro title="Visit, call or write to us">
        <a href={mailHref(site.email)} className="soil-btn mt-8">Write to us</a>
      </PageIntro>
      <Section><div className="max-w-3xl"><ContactDetails site={site} /></div></Section>
    </>
  );
}
