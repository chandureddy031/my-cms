"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui";
import { SITE_NAV } from "@/constants/navigation";
import { useSidebar } from "@/hooks/layout";
import { cn } from "@/utils/cn";
import { homeHref, isActivePath } from "@/utils/routes";
import { SidebarLink } from "./SidebarLink";

interface SiteShellProps {
  logo: React.ReactNode;
  logoMini: React.ReactNode;
  children: React.ReactNode;
}

/** Public page frame: collapsible sidebar on desktop, top bar + drawer on phones. */
export function SiteShell({ logo, logoMini, children }: SiteShellProps) {
  const path = usePathname();
  const { expanded, toggleExpanded, mobileOpen, openMobile, closeMobile } = useSidebar();

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:hidden">
        <Link href={homeHref()} className="text-2xl">{logo}</Link>
        <button onClick={openMobile} aria-label="Open menu" className="icon-button"><Icon name="menu" /></button>
      </header>

      {mobileOpen && <div className="drawer-backdrop" onClick={closeMobile} />}

      <aside className={cn("glass fixed inset-y-0 left-0 z-50 flex w-72 flex-col shadow-lift transition-all duration-300 md:translate-x-0 md:sb-closed:w-20", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* collapsed: the toggle sits above the mini logo */}
        <div className="flex items-center justify-between gap-2 px-5 py-6 md:sb-closed:flex-col-reverse md:sb-closed:px-2">
          <Link href={homeHref()} onClick={closeMobile} className="text-3xl md:sb-closed:hidden">{logo}</Link>
          <Link href={homeHref()} className="hidden text-2xl md:sb-closed:block">{logoMini}</Link>
          <button
            onClick={toggleExpanded}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            title={expanded ? "Collapse" : "Expand"}
            className="hidden rounded-xl border border-brand-100 bg-white p-2 text-brand-700 shadow-soft transition hover:shadow-glow md:inline-flex"
          >
            <Icon name="chevron" className="h-4 w-4 transition sb-closed:rotate-180" />
          </button>
          <button onClick={closeMobile} aria-label="Close menu" className="icon-button md:hidden"><Icon name="close" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {SITE_NAV.map((link) => <SidebarLink key={link.href} link={link} active={isActivePath(path, link.href)} onNavigate={closeMobile} />)}
        </nav>
      </aside>

      <div className="transition-[padding] duration-300 md:pl-72 md:sb-closed:pl-20">{children}</div>
    </div>
  );
}
