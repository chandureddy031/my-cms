import Link from "next/link";
import { SECTIONS, SECTION_LABELS } from "@/constants";
import { Logo } from "@/components/Logo";
import { AdminNav } from "@/components/AdminNav";
import { readKey } from "@/lib/admin";
import { lock } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "CMS", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const unlocked = Boolean(await readKey());
  return (
    <div className="min-h-screen">
      {/* no backdrop-filter here: it would trap the fixed mobile drawer inside the header */}
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 shadow-soft">
        <div className="flex items-center gap-x-6 px-4 py-3 md:px-10 md:py-4">
          <Link href="/apple" className="flex items-center gap-2 text-2xl"><Logo name="APPLES" /> <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-bold text-white">CMS</span></Link>
          {unlocked && (
            <AdminNav
              links={[{ href: "/apple", label: "Dashboard" }, ...SECTIONS.map((s) => ({ href: `/apple/${s}`, label: SECTION_LABELS[s] })),
                { href: "/apple/donations", label: "Donations" }, { href: "/apple/settings", label: "Settings" }]}
              lock={<form action={lock}><button className="w-full rounded-full px-3 py-1.5 text-left font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600">Lock</button></form>}
            />
          )}
        </div>
      </header>
      <main className="px-4 py-6 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
