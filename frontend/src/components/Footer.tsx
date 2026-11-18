import Link from "next/link";
import { NAV } from "@/constants";
import type { Site } from "@/lib/api";
import { Logo } from "./Logo";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="mt-10 border-t border-brand-100 bg-white/70 px-6 py-12 md:px-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Logo name={site.name} className="text-3xl" />
          <p className="mt-3 max-w-xs text-sm text-gray-600">{site.mission}</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {NAV.map((n) => <li key={n.href}><Link href={n.href} className="text-gray-600 hover:text-brand-700">{n.label}</Link></li>)}
        </ul>
        <div className="text-sm text-gray-600">
          <p><a href={`mailto:${site.email}`} className="hover:text-brand-700">{site.email}</a></p>
          <p className="mt-1"><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">{site.phone}</a></p>
          <p className="mt-3 max-w-xs">{site.address}</p>
          <p className="mt-1 max-w-xs">{site.office}</p>
        </div>
      </div>
      <p className="mt-10 text-xs text-gray-400">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
