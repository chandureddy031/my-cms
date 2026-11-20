"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { WEBSITE_NAV } from "../../constants/navigation";
import { isActive, websiteRoutes } from "../../routes";

/** Logo, menu and Donate. On phones the menu is a native <details> that closes after navigating. */
export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => menu.current?.removeAttribute("open"), [pathname]);

  const links = WEBSITE_NAV.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={isActive(pathname, href) ? "page" : undefined}
      className={cn("whitespace-nowrap transition hover:text-soil-ink", isActive(pathname, href) && "font-semibold text-soil-ink shadow-[inset_0_-2px_var(--color-soil-brand)]")}>
      {label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-30 border-b border-soil-line bg-soil-paper/95 backdrop-blur">
      <div className="soil-x flex h-20 items-center justify-between gap-6">
        <Link href={websiteRoutes.home} className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="APPLES logo" width={56} height={48} className="h-12 w-14 object-contain" priority />
          <span>
            <span className="block font-soil-head text-2xl leading-none text-soil-ink">APPLES</span>
            <span className="whitespace-nowrap text-sm text-soil-body">Anantapuramu, since 1995</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden gap-5 text-base text-soil-body xl:flex">{links}</nav>
        <div className="flex items-center gap-3">
          <details ref={menu} className="relative xl:hidden">
            <summary className="soil-btn-line cursor-pointer list-none py-2 [&::-webkit-details-marker]:hidden">Menu</summary>
            <nav aria-label="Main" className="absolute right-0 mt-2 flex w-56 flex-col gap-3 rounded-md border border-soil-line bg-soil-paper p-5 text-soil-body shadow-lg">{links}</nav>
          </details>
          <Link href={websiteRoutes.donate} className="soil-btn py-2.5">Donate</Link>
        </div>
      </div>
    </header>
  );
}
