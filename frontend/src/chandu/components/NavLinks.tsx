"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  ["/chandu", "Home"],
  ["/chandu/about", "About Us"],
  ["/chandu/activities", "Activities"],
  ["/chandu/reports", "Impact Reports"],
  ["/chandu/stories", "Case Studies"],
  ["/chandu/gallery", "Gallery"],
  ["/chandu/contact", "Contact"],
] as const;

/** Site menu; the current page is highlighted. Used by the header and the footer. */
export default function NavLinks({ className = "", linkClassName = "", activeClassName = "font-semibold text-white" }: {
  className?: string; linkClassName?: string; activeClassName?: string;
}) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={className}>
      {NAV.map(([href, label]) => {
        const active = href === "/chandu" ? pathname === "/chandu" : pathname.startsWith(href);
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
