import type { Metadata } from "next";
import Link from "next/link";
import LogoBackground from "@/components/LogoBackground";
import { isAdmin } from "@/controller/auth";
import { logout } from "@/controller/actions";
import { CMS_PAGES } from "@/controller/pages";
import LoginForm from "./LoginForm";
import SideLink from "./SideLink";

export const metadata: Metadata = { title: "APPLES CMS", robots: { index: false } };
// Reads the login cookie, so it renders per request.
export const instant = false;

/** The CMS has its own plain look: no website header, footer or logo background. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    return (
      <main className="grid flex-1 place-items-center p-4">
        <LogoBackground />
        <div className="glass w-full max-w-sm rounded-2xl p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-stone-900">APPLES CMS</h1>
          <p className="mt-1 mb-6 text-stone-600">Enter the admin password.</p>
          <LoginForm />
        </div>
      </main>
    );
  }
  return (
    <div className="flex flex-1 flex-col bg-stone-100 md:flex-row">
      <aside className="flex shrink-0 flex-col gap-1 border-b border-stone-200 bg-white p-4 md:sticky md:top-0 md:h-screen md:w-64 md:border-r md:border-b-0">
        <p className="mb-3 px-3 text-lg font-bold text-stone-900">APPLES CMS</p>
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {CMS_PAGES.map((p) => <SideLink key={p.slug} href={`/admin/${p.slug}`}>{p.label}</SideLink>)}
        </nav>
        <div className="mt-auto flex gap-2 pt-4 md:flex-col">
          <Link href="/" target="_blank" className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-stone-100">Open website ↗</Link>
          <form action={logout}><button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50">Log out</button></form>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
