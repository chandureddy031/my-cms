import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/api";

const display = Fraunces({ subsets: ["latin"], variable: "--ff-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--ff-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSite();
  return { title: { default: s.name, template: `%s · ${s.name}` }, description: s.tagline };
}

// Applies the saved sidebar state before the first paint.
const SIDEBAR_SCRIPT = `try{if(localStorage.getItem("apple.sidebar")==="0")document.documentElement.dataset.sb="closed"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SIDEBAR_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
