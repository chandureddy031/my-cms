"use client";
import { useEffect } from "react";
import { MASCOT_GESTURES } from "@/constants/mascot";
import { prefersReducedMotion } from "@/utils/motion";

/** Turns the mascot's eyes towards the pointer through the --lx / --ly CSS variables. */
export function usePupilTracking(getSvg: () => SVGSVGElement | null) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const svg = getSvg();
        if (!svg) return;
        const box = svg.getBoundingClientRect();
        const eyesX = box.left + box.width / 2;
        const eyesY = box.top + box.height * 0.33;
        const angle = Math.atan2(event.clientY - eyesY, event.clientX - eyesX);
        const reach = MASCOT_GESTURES.lookReach * Math.min(Math.hypot(event.clientX - eyesX, event.clientY - eyesY) / 120, 1);
        svg.style.setProperty("--lx", `${(Math.cos(angle) * reach).toFixed(2)}px`);
        svg.style.setProperty("--ly", `${(Math.sin(angle) * reach).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [getSvg]);
}
