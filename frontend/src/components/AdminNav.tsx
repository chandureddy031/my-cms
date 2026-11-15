"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

type L = { href: string; label: string };

// CMS menu: inline on desktop, ☰ drawer on mobile. Same links for both.
export function AdminNav({ links, lock }: { links: L[]; lock: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const on = (h: string) => (h === "/apple" ? path === h : path.startsWith(h));
  const item = (l: L, big = false) => (
    <Link key={l.href} href={l.href} aria-current={on(l.href) ? "page" : undefined}
      className={`rounded-full font-semibold transition ${big ? "block rounded-2xl px-4 py-3" : "px-3 py-1.5"}
        ${on(l.href) ? "bg-brand-100 text-brand-800" : "text-gray-600 hover:bg-brand-50 hover:text-brand-800"}`}>
      {l.label}
    </Link>
  );

  return (
    <>
      <nav className="hidden flex-1 flex-wrap items-center gap-1 text-sm md:flex">
        {links.map((l) => item(l))}
        <span className="flex-1" />
        <a href="/" target="_blank" className="rounded-full px-3 py-1.5 font-semibold text-brand-700 hover:bg-brand-50">View site ↗</a>
        {lock}
      </nav>

      <button onClick={() => setOpen(true)} aria-label="Open menu" className="ml-auto rounded-xl p-2 text-brand-800 hover:bg-brand-100 md:hidden">
        <Icon name="menu" className="h-6 w-6" />
      </button>
      {open && <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`glass fixed inset-y-0 left-0 z-50 flex w-72 flex-col shadow-lift transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-5">
          <span className="font-display text-xl font-bold text-brand-900">CMS menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-xl p-2 text-brand-800 hover:bg-brand-100"><Icon name="close" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 text-sm">{links.map((l) => item(l, true))}</nav>
        <div className="space-y-1 border-t border-brand-100 p-3 text-sm">
          <a href="/" target="_blank" className="block rounded-2xl px-4 py-3 font-semibold text-brand-700 hover:bg-brand-50">View site ↗</a>
          {lock}
        </div>
      </aside>
    </>
  );
}
