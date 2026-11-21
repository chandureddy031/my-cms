"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/chandu/components/Logo";
import NavLinks from "@/chandu/components/NavLinks";

function Menu() {
  return (
    // One row; swipes sideways on phones instead of wrapping.
    <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] lg:justify-center">
      <NavLinks className="flex shrink-0 gap-2"
        linkClassName="shrink-0 whitespace-nowrap rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-stone-800 transition hover:border-orange-400 hover:text-orange-800"
        activeClassName="!border-transparent grad-deep font-semibold !text-amber-50 shadow-md" />
      <Link href="/chandu/donate" className="btn ml-2 shrink-0">Donate</Link>
    </div>
  );
}

/**
 * Full header scrolls away normally; once it is off screen a short bar (small logo + name + menu) slides in at the top.
 * The big header never changes height, so the page can't jump and flicker between the two states.
 */
export default function Header({ name, fullName, tagline }: { name: string; fullName: string; tagline: string }) {
  const full = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // Fires only when the header crosses the screen edge, not on every scroll event, so no throttle/debounce needed.
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    if (full.current) observer.observe(full.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header ref={full} className="frost shadow-sm">
        <div className="flex items-center justify-center gap-5 px-4 py-5 sm:py-6">
          <Logo className="size-20 shrink-0 object-contain sm:size-28" />
          <div>
            <h1 className="grad-text text-4xl font-bold sm:text-7xl">{name}</h1>
            <p className="mt-1 text-lg font-medium text-stone-800 sm:text-3xl">
              {fullName}
            </p>
            <p className="mt-2 text-sm text-stone-600 sm:text-lg">
              {tagline}
            </p>
          </div>
        </div>
        <div className="border-t border-white/60"><Menu /></div>
      </header>

      <div inert={!compact}
        className={`frost fixed inset-x-0 top-0 z-30 transition-transform duration-300 ${compact ? "translate-y-0 shadow-md shadow-orange-950/10" : "-translate-y-full"}`}>
        <div className="flex flex-wrap items-center justify-center gap-x-2 lg:flex-nowrap">
          <Link href="/chandu" className="flex shrink-0 items-center gap-2 px-4 pt-2 lg:pt-0">
            <Logo alt="" className="size-10 object-contain" />
            <span className="grad-text font-display text-2xl font-bold">{name}</span>
          </Link>
          <Menu />
        </div>
      </div>
    </>
  );
}
