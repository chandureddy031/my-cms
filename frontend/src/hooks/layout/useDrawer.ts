"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Open state of a mobile drawer that closes itself when the page changes. */
export function useDrawer() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return { path, open, openDrawer: () => setOpen(true), closeDrawer: () => setOpen(false) };
}
