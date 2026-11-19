import Link from "next/link";
import { cn } from "@/utils/cn";

interface CmsNavLinkProps {
  href: string;
  label: string;
  active: boolean;
  /** Bigger, full-width style for the mobile drawer. */
  inDrawer?: boolean;
}

export function CmsNavLink({ href, label, active, inDrawer }: CmsNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full font-semibold transition",
        inDrawer ? "block rounded-2xl px-4 py-3" : "px-3 py-1.5",
        active ? "bg-brand-100 text-brand-800" : "text-gray-600 hover:bg-brand-50 hover:text-brand-800",
      )}
    >
      {label}
    </Link>
  );
}
