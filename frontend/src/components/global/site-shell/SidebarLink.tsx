import Link from "next/link";
import { Icon } from "@/components/ui";
import type { NavLink } from "@/constants/navigation";
import { cn } from "@/utils/cn";
import { donateHref } from "@/utils/routes";

interface SidebarLinkProps {
  link: NavLink;
  active: boolean;
  onNavigate: () => void;
}

/** One sidebar entry; Donate is drawn as a gradient button. Labels hide when the sidebar is collapsed. */
export function SidebarLink({ link, active, onNavigate }: SidebarLinkProps) {
  const isDonate = link.href === donateHref();
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      title={link.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
        isDonate ? "mt-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow hover:brightness-110"
          : active ? "bg-brand-100 text-brand-800 shadow-soft"
            : "text-gray-600 hover:bg-brand-50 hover:text-brand-800",
      )}
    >
      <Icon name={link.icon} className="h-5 w-5 shrink-0" />
      <span className="md:sb-closed:hidden">{link.label}</span>
    </Link>
  );
}
