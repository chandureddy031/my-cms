"use client";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/config";
import { writeStorage } from "@/utils/storage";

/**
 * Desktop collapse state lives on <html data-sb> (set before first paint in app/layout.tsx), so the
 * layout is pure CSS with no flicker. `expanded` only mirrors it for the toggle's label.
 */
export function useSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setExpanded(document.documentElement.dataset.sb !== "closed"), []);

  const toggleExpanded = () => {
    const next = !expanded;
    if (next) delete document.documentElement.dataset.sb;
    else document.documentElement.dataset.sb = "closed";
    writeStorage(STORAGE_KEYS.sidebar, next ? "1" : "0");
    setExpanded(next);
  };

  return { expanded, toggleExpanded, mobileOpen, openMobile: () => setMobileOpen(true), closeMobile: () => setMobileOpen(false) };
}
