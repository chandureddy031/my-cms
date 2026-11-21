import Logo from "@/chandu/components/Logo";
import NavLinks from "@/chandu/components/NavLinks";
import { getContent, telHref } from "@/chandu/controller/content";

export default function Footer() {
  const { site } = getContent();
  return (
    <footer className="grad-deep px-4 py-6 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex gap-4">
          <Logo alt="" className="size-14 shrink-0 object-contain" />
          <div>
            <p className="font-display text-xl font-semibold text-amber-100">{site.name}</p>
            <p className="mt-1 text-sm">{site.headOffice}</p>
          </div>
        </div>
        <NavLinks className="flex flex-wrap content-start gap-x-4 gap-y-1" linkClassName="hover:text-white" />
        <div className="grid content-start gap-1">
          <a href={telHref(site.phone)} className="hover:text-white">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-6xl border-t border-white/15 pt-3 text-sm">© {site.name} · {site.footerNote}</p>
    </footer>
  );
}
