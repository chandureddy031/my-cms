"use client";
import { useEffect, useRef } from "react";
import { LINES, pick, type Mood } from "@/constants/mascot";

type Api = { open: boolean; setOpen: (o: boolean) => void; show: (m: Mood, t?: string, pop?: boolean) => void; rest: () => void };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const DRAG_PX = 10, HOLD_MS = 550, DIZZY_TAPS = 4, DIZZY_WINDOW = 1600;

// Gestures on the mascot (he never leaves his corner):
// tap = giggle/open, tap while open = tickle, 4 fast taps = dizzy, hold = hug, drag = he leans + gets shy then springs back,
// double-click = wink, mouse hover = bashful. Also makes his eyes follow the pointer.
export function useMascotTouch(api: Api) {
  const ref = useRef<HTMLButtonElement>(null);
  const svg = () => ref.current?.querySelector("svg") as SVGSVGElement | null;
  const g = useRef({ down: false, x: 0, y: 0, dragging: false, held: false, hold: 0 as unknown as ReturnType<typeof setTimeout>, taps: [] as number[] });
  const apiRef = useRef(api);
  apiRef.current = api;

  // Eyes follow the pointer (rAF-throttled, off for reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = svg(); if (!s) return;
        const r = s.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.33;
        const a = Math.atan2(e.clientY - cy, e.clientX - cx), d = Math.min(Math.hypot(e.clientX - cx, e.clientY - cy) / 120, 1);
        s.style.setProperty("--lx", `${(Math.cos(a) * 2.2 * d).toFixed(2)}px`);
        s.style.setProperty("--ly", `${(Math.sin(a) * 2.2 * d).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const lean = (dx: number, dy: number) => {
    const s = svg(); if (!s) return;
    s.classList.toggle("m-springing", dx === 0 && dy === 0);
    s.style.transform = dx || dy ? `translate(${clamp(dx / 3, -14, 14)}px, ${clamp(dy / 3, -12, 6)}px) rotate(${clamp(dx / 5, -14, 14)}deg) scale(${1 + clamp(Math.abs(dx) / 600, 0, 0.06)}, ${1 - clamp(Math.abs(dx) / 900, 0, 0.04)})` : "";
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const s = g.current;
    Object.assign(s, { down: true, x: e.clientX, y: e.clientY, dragging: false, held: false });
    ref.current?.setPointerCapture(e.pointerId);
    s.hold = setTimeout(() => { s.held = true; apiRef.current.show("love", LINES.hug, false); }, HOLD_MS);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = g.current;
    if (!s.down) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (!s.dragging && Math.hypot(dx, dy) > DRAG_PX) {
      s.dragging = true; clearTimeout(s.hold);
      apiRef.current.show("shy", LINES.drag, false);
    }
    if (s.dragging) lean(dx, dy);
  };

  const end = (tap: boolean) => {
    const s = g.current;
    if (!s.down) return;
    s.down = false; clearTimeout(s.hold);
    if (s.dragging) { lean(0, 0); apiRef.current.show("happy", LINES.dragBack, false); return; }
    if (s.held || !tap) return;
    const now = Date.now();
    s.taps = [...s.taps.filter((t) => now - t < DIZZY_WINDOW), now];
    const a = apiRef.current;
    if (s.taps.length >= DIZZY_TAPS) { s.taps = []; a.show("dizzy", LINES.dizzy, false); return; }
    if (!a.open) { a.setOpen(true); a.show("happy", undefined); }
    else a.show("happy", pick(LINES.tickle), false);
  };

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: () => end(true),
    onPointerCancel: () => end(false),
    onDoubleClick: () => apiRef.current.show("wink", LINES.wink, false),
    onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === "mouse" && !g.current.down) apiRef.current.show("shy", undefined, false); },
    onPointerLeave: (e: React.PointerEvent) => { if (e.pointerType === "mouse" && !g.current.down) apiRef.current.rest(); },
    // Keyboard: Enter/Space fire click with detail 0 — open/close the bubble.
    onClick: (e: React.MouseEvent) => { if (e.detail === 0) apiRef.current.setOpen(!apiRef.current.open); },
  };
}
