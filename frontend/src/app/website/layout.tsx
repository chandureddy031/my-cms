import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { getSiteSettings } from "@/lib/api";
import { SiteFooter, SiteHeader } from "@/website";

const headFont = Newsreader({ subsets: ["latin"], weight: ["500"], variable: "--ff-soil-head" });
const bodyFont = Instrument_Sans({ subsets: ["latin"], variable: "--ff-soil-body" });

export const metadata: Metadata = { title: { default: "APPLES NGO, Anantapuramu", template: "%s · APPLES NGO" } };

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings();
  return (
    <div className={`${headFont.variable} ${bodyFont.variable} flex min-h-screen flex-col bg-soil-paper font-soil-body text-lg text-soil-ink`}>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter site={site} />
    </div>
  );
}
