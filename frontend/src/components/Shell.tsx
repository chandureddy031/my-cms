"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/constants";
import { useSidebar } from "@/hooks/useSidebar";
import { Icon } from "./Icon";

// Left sidebar (collapsible on desktop, drawer on mobile) around the page.
export function Shell({ logo, mini, children }: { logo: React.ReactNode; mini: React.ReactNode; children: React.ReactNode }) {
  const path = usePathname();
  const { open, toggle, mobile, setMobile } = useSidebar();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:hidden">
        <Link href="/" className="text-2xl">{logo}</Link>
        <button onClick={() => setMobile(true)} aria-label="Open menu" className="rounded-xl p-2 text-brand-800 hover:bg-brand-100"><Icon name="menu" /></button>
      </header>

      {mobile && <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden" onClick={() => setMobile(false)} />}

      <aside
        className={`glass fixed inset-y-0 left-0 z-50 flex flex-col shadow-lift transition-all duration-300 md:translate-x-0
          ${mobile ? "translate-x-0" : "-translate-x-full"} w-72 md:sb-closed:w-20`}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-6 md:sb-closed:flex-col md:sb-closed:px-2">
          <Link href="/" onClick={() => setMobile(false)} className="text-3xl md:sb-closed:hidden">{logo}</Link>
          <Link href="/" className="hidden text-2xl md:sb-closed:block">{mini}</Link>
          <button
            onClick={toggle}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            title={open ? "Collapse" : "Expand"}
            className="hidden rounded-xl border border-brand-100 bg-white p-2 text-brand-700 shadow-soft transition hover:shadow-glow md:inline-flex"
          >
            <Icon name="chevron" className="h-4 w-4 transition sb-closed:rotate-180" />
          </button>
          <button onClick={() => setMobile(false)} aria-label="Close menu" className="rounded-xl p-2 text-brand-800 hover:bg-brand-100 md:hidden"><Icon name="close" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {NAV.map((n) => {
            const on = active(n.href);
            const cta = n.href === "/donate";
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobile(false)}
                title={n.label}
                aria-current={on ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition
                  ${cta ? "mt-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow hover:brightness-110"
                    : on ? "bg-brand-100 text-brand-800 shadow-soft" : "text-gray-600 hover:bg-brand-50 hover:text-brand-800"}`}
              >
                <Icon name={n.icon} className="h-5 w-5 shrink-0" />
                <span className="md:sb-closed:hidden">{n.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="transition-[padding] duration-300 md:pl-72 md:sb-closed:pl-20">{children}</div>
    </div>
  );
}
