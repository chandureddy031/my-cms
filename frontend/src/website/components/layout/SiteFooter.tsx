import Link from "next/link";
import type { SiteSettings } from "@/types/site";
import { mailHref, telHref } from "@/utils/format";
import { WEBSITE_NAV } from "../../constants/navigation";
import { websiteRoutes } from "../../routes";

export function SiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className="bg-soil-ink py-16 text-white/75">
      <div className="soil-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-soil-head text-2xl text-white">{site.name}</p>
          <p className="mt-3 max-w-sm">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm">{site.address}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2">
          {WEBSITE_NAV.map(({ href, label }) => <Link key={href} href={href} className="hover:text-white">{label}</Link>)}
        </nav>
        <div className="grid content-start gap-2">
          <a href={telHref(site.phone)} className="hover:text-white">{site.phone}</a>
          <a href={mailHref(site.email)} className="hover:text-white">{site.email}</a>
          <Link href={websiteRoutes.donate} className="soil-btn mt-4 justify-self-start py-2">Donate</Link>
        </div>
      </div>
      <div className="soil-x mt-12 flex flex-wrap justify-between gap-2 border-t border-white/15 pt-6 text-sm">
        <span>© {new Date().getFullYear()} {site.name}, Reg. No. 154 of 1995</span>
        <span>Non-profit, non-political, secular</span>
      </div>
    </footer>
  );
}
