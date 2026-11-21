import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getContent } from "@/chandu/controller/content";

// Display font (Fraunces) comes from the root layout; the APPLES body font is Geist.
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export function generateMetadata(): Metadata {
  const { site } = getContent();
  return {
    title: { default: `${site.name} | ${site.fullName}`, template: `%s · ${site.name}` },
    description: `${site.fullName}, ${site.headOffice}`,
  };
}

/** Everything under /chandu: the APPLES website and its CMS (/chandu/admin). */
export default function ChanduLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`chandu ${geist.variable} flex min-h-screen flex-col font-sans text-stone-800 [--font-sans:var(--font-geist-sans),system-ui,sans-serif]`}>
      {children}
    </div>
  );
}
