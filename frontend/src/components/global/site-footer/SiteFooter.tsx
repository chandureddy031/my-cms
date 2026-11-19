import Link from "next/link";
import { Logo } from "@/components/ui";
import { SITE_NAV } from "@/constants/navigation";
import type { SiteSettings } from "@/types/site";
import { mailHref, telHref } from "@/utils/format";

interface SiteFooterProps {
  site: SiteSettings;
}

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="page-x mt-10 border-t border-brand-100 bg-white/70 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Logo name={site.name} className="text-3xl" />
          <p className="mt-3 max-w-xs text-sm text-gray-600">{site.mission}</p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {SITE_NAV.map((link) => <li key={link.href}><Link href={link.href} className="text-gray-600 hover:text-brand-700">{link.label}</Link></li>)}
        </ul>
        <div className="text-sm text-gray-600">
          <p><a href={mailHref(site.email)} className="hover:text-brand-700">{site.email}</a></p>
          <p className="mt-1"><a href={telHref(site.phone)} className="hover:text-brand-700">{site.phone}</a></p>
          <p className="mt-3 max-w-xs">{site.address}</p>
          <p className="mt-1 max-w-xs">{site.office}</p>
        </div>
      </div>
      <p className="mt-10 text-xs text-gray-400">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}
