import type { SiteSettings } from "@/types/site";
import { mailHref, telHref } from "@/utils/format";

export function WebsiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className="border-t border-ws-line py-14 text-sm text-ws-muted">
      <div className="ws-x grid gap-8 sm:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-display text-2xl text-ws-ink">{site.name}</p>
          <p className="mt-2 max-w-md">{site.tagline}</p>
          <p className="mt-4 max-w-md">{site.address}</p>
          <p className="mt-1 max-w-md">{site.office}</p>
        </div>
        <div className="space-y-2 sm:text-right">
          <a href={mailHref(site.email)} className="block text-ws-ink hover:underline">{site.email}</a>
          <a href={telHref(site.phone)} className="block text-ws-ink hover:underline">{site.phone}</a>
          <p className="pt-4">© {new Date().getFullYear()} {site.name}. Registered society, Reg. No. 154.</p>
        </div>
      </div>
    </footer>
  );
}
