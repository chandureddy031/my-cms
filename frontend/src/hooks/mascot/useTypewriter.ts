"use client";
import { useEffect, useState } from "react";
import { MASCOT_TIMING } from "@/constants/mascot";
import { prefersReducedMotion } from "@/utils/motion";

/** Number of characters of `text` to show; counts up letter by letter (all at once for reduced motion). */
export function useTypewriter(text: string) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return setShown(text.length);
    setShown(0);
    const timer = setInterval(() => setShown((n) => (n >= text.length ? (clearInterval(timer), n) : n + 1)), MASCOT_TIMING.typeTickMs);
    return () => clearInterval(timer);
  }, [text]);
  return shown;
}
