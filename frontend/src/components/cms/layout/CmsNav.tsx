"use client";
import { Icon } from "@/components/ui";
import { CMS_NAV } from "@/constants/cms";
import { useDrawer } from "@/hooks/layout";
import { cn } from "@/utils/cn";
import { homeHref, isActivePath } from "@/utils/routes";
import { CmsNavLink } from "./CmsNavLink";

interface CmsNavProps {
  /** The Lock button (a server-action form, so it is passed in from the server). */
  lockButton: React.ReactNode;
}

/** CMS menu: inline on desktop, a drawer on phones. */
export function CmsNav({ lockButton }: CmsNavProps) {
  const { path, open, openDrawer, closeDrawer } = useDrawer();
  const links = (inDrawer?: boolean) =>
    CMS_NAV.map((link) => <CmsNavLink key={link.href} {...link} active={isActivePath(path, link.href)} inDrawer={inDrawer} />);

  return (
    <>
      <nav className="hidden flex-1 flex-wrap items-center gap-1 text-sm md:flex">
        {links()}
        <span className="flex-1" />
        <a href={homeHref()} target="_blank" className="rounded-full px-3 py-1.5 font-semibold text-brand-700 hover:bg-brand-50">View site ↗</a>
        {lockButton}
      </nav>

      <button onClick={openDrawer} aria-label="Open menu" className="icon-button ml-auto md:hidden">
        <Icon name="menu" className="h-6 w-6" />
      </button>
      {open && <div className="drawer-backdrop" onClick={closeDrawer} />}
      <aside className={cn("glass fixed inset-y-0 left-0 z-50 flex w-72 flex-col shadow-lift transition-transform duration-300 md:hidden", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-5">
          <span className="font-display text-xl font-bold text-brand-900">CMS menu</span>
          <button onClick={closeDrawer} aria-label="Close menu" className="icon-button"><Icon name="close" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 text-sm">{links(true)}</nav>
        <div className="space-y-1 border-t border-brand-100 p-3 text-sm">
          <a href={homeHref()} target="_blank" className="block rounded-2xl px-4 py-3 font-semibold text-brand-700 hover:bg-brand-50">View site ↗</a>
          {lockButton}
        </div>
      </aside>
    </>
  );
}
