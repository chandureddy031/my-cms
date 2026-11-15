import Link from "next/link";
import { SECTIONS, SECTION_LABELS } from "@/constants";
import { Logo } from "@/components/Logo";
import { readKey } from "@/lib/admin";
import { lock } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "CMS", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const unlocked = Boolean(await readKey());
  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-30 shadow-soft">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 md:px-10">
          <Link href="/apple" className="flex items-center gap-2 text-2xl"><Logo name="APPLE" /> <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-bold text-white">CMS</span></Link>
          {unlocked && (
            <nav className="flex flex-1 flex-wrap items-center gap-1 text-sm font-semibold">
              <Link href="/apple" className="rounded-full px-3 py-1.5 text-gray-600 hover:bg-brand-50 hover:text-brand-800">Dashboard</Link>
              {SECTIONS.map((s) => <Link key={s} href={`/apple/${s}`} className="rounded-full px-3 py-1.5 text-gray-600 hover:bg-brand-50 hover:text-brand-800">{SECTION_LABELS[s]}</Link>)}
              <Link href="/apple/donations" className="rounded-full px-3 py-1.5 text-gray-600 hover:bg-brand-50 hover:text-brand-800">Donations</Link>
              <Link href="/apple/settings" className="rounded-full px-3 py-1.5 text-gray-600 hover:bg-brand-50 hover:text-brand-800">Settings</Link>
              <span className="flex-1" />
              <a href="/" target="_blank" className="rounded-full px-3 py-1.5 text-brand-700 hover:bg-brand-50">View site ↗</a>
              <form action={lock}><button className="rounded-full px-3 py-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600">Lock</button></form>
            </nav>
          )}
        </div>
      </header>
      <main className="px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
