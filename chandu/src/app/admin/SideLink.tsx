"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link href={href} className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${active ? "bg-orange-100 text-orange-900" : "text-stone-700 hover:bg-stone-100"}`}>
      {children}
    </Link>
  );
}
