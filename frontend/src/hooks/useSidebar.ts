"use client";
import { useEffect, useState } from "react";

const KEY = "apple.sidebar";

// Desktop collapsed state lives on <html data-sb> (set pre-paint by layout.tsx) + localStorage.
// `open` only mirrors it for labels; the layout itself is pure CSS, so there is no flicker.
export function useSidebar() {
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  useEffect(() => setOpen(document.documentElement.dataset.sb !== "closed"), []);
  const toggle = () => {
    const next = !open;
    if (next) delete document.documentElement.dataset.sb;
    else document.documentElement.dataset.sb = "closed";
    try { localStorage.setItem(KEY, next ? "1" : "0"); } catch {}
    setOpen(next);
  };
  return { open, toggle, mobile, setMobile };
}
