import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { STORAGE_KEYS } from "@/constants/config";
import { getSiteSettings } from "@/lib/api";

const displayFont = Fraunces({ subsets: ["latin"], variable: "--ff-display" });
const sansFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--ff-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return { title: { default: site.name, template: `%s · ${site.name}` }, description: site.tagline };
}

/** Restores the collapsed sidebar before the first paint (see hooks/layout/useSidebar.ts). */
const RESTORE_SIDEBAR = `try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEYS.sidebar)})==="0")document.documentElement.dataset.sb="closed"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_SIDEBAR }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
