"use client";
import { useEffect, useRef } from "react";
import { DONATE_TARGETS, FAST_SCROLL_SPEED, MASCOT_LINES, MASCOT_TIMING } from "@/constants/mascot";
import type { Mood, ShowMascot } from "./types";

interface ReactionParams {
  path: string;
  show: ShowMascot;
  setMood: (mood: Mood) => void;
  rest: () => void;
}

const isTextField = (target: EventTarget | null) => Boolean((target as Element | null)?.matches?.("input, textarea"));

/** He notices the visitor: fast scrolling, reaching the end, hovering Donate, typing, coming back to the tab. */
export function useMascotReactions({ path, show, setMood, rest }: ReactionParams) {
  const quietUntil = useRef(0);

  useEffect(() => {
    // At most one ambient reaction per gap, and never opening the bubble.
    const react = (mood: Mood, text: string) => {
      if (Date.now() < quietUntil.current) return;
      quietUntil.current = Date.now() + MASCOT_TIMING.ambientGapMs;
      show(mood, text, false);
    };

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let reachedEnd = false;
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const speed = Math.abs(y - lastY) / Math.max(now - lastTime, 1);
      lastY = y;
      lastTime = now;
      if (speed > FAST_SCROLL_SPEED) react("surprised", MASCOT_LINES.fastScroll);
      const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 40;
      if (!reachedEnd && atBottom && y > 400) {
        reachedEnd = true;
        react("celebrate", MASCOT_LINES.pageEnd);
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && (event.target as Element).closest?.(DONATE_TARGETS)) react("excited", MASCOT_LINES.donateHover);
    };
    const onFocusIn = (event: FocusEvent) => isTextField(event.target) && setMood("listening");
    const onFocusOut = (event: FocusEvent) => isTextField(event.target) && rest();

    let leftAt = 0;
    const onVisibilityChange = () => {
      if (document.hidden) leftAt = Date.now();
      else if (leftAt && Date.now() - leftAt > MASCOT_TIMING.welcomeBackAfterMs) show("hello", MASCOT_LINES.welcomeBack, false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [path, show, setMood, rest]);
}
