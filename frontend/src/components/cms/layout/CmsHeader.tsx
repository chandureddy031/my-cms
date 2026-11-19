import Link from "next/link";
import { Logo } from "@/components/ui";
import { SITE_DEFAULTS } from "@/constants/site";
import { lock } from "@/lib/admin/actions";
import { cmsDashboardHref } from "@/utils/routes";
import { CmsNav } from "./CmsNav";

interface CmsHeaderProps {
  unlocked: boolean;
}

/** Sticky CMS top bar; the menu appears once the editor is unlocked. */
export function CmsHeader({ unlocked }: CmsHeaderProps) {
  return (
    // no backdrop-filter here: it would trap the fixed mobile drawer inside the header
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 shadow-soft">
      <div className="flex items-center gap-x-6 px-4 py-3 md:px-10 md:py-4">
        <Link href={cmsDashboardHref()} className="flex items-center gap-2 text-2xl">
          <Logo name={SITE_DEFAULTS.name} /> <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-bold text-white">CMS</span>
        </Link>
        {unlocked && (
          <CmsNav
            lockButton={
              <form action={lock}>
                <button className="w-full rounded-full px-3 py-1.5 text-left font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600">Lock</button>
              </form>
            }
          />
        )}
      </div>
    </header>
  );
}
