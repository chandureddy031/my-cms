"use client";
import { useEffect, useState } from "react";

const KEY = "apple.sidebar";

// Desktop open/collapsed is remembered per browser; mobile drawer always starts closed.
export function useSidebar() {
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem(KEY) === "0") setOpen(false); } catch {}
  }, []);
  const toggle = () =>
    setOpen((o) => {
      try { localStorage.setItem(KEY, o ? "0" : "1"); } catch {}
      return !o;
    });
  return { open, toggle, mobile, setMobile };
}
