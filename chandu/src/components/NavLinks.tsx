"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/activities", "Activities"],
  ["/reports", "Impact Reports"],
  ["/stories", "Case Studies"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
] as const;

/** Site menu; the current page is highlighted. Used by the header and the footer. */
export default function NavLinks({ className = "", linkClassName = "", activeClassName = "font-semibold text-white" }: {
  className?: string; linkClassName?: string; activeClassName?: string;
}) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={className}>
      {NAV.map(([href, label]) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}
            className={`${linkClassName} ${active ? activeClassName : ""}`}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
