"use client";
import { useCallback, useRef } from "react";
import { MASCOT_GESTURES, MASCOT_LINES } from "@/constants/mascot";
import { clamp, pickRandom } from "@/utils/motion";
import type { MascotState } from "./useMascot";
import { usePupilTracking } from "./usePupilTracking";

interface PressState {
  down: boolean;
  startX: number;
  startY: number;
  dragging: boolean;
  held: boolean;
  holdTimer?: ReturnType<typeof setTimeout>;
  taps: number[];
}

/**
 * Pointer handlers for the mascot button (he never leaves his corner):
 * tap = open bubble / tickle, 4 quick taps = dizzy, hold = hug, drag = leans and gets shy then springs back,
 * double-click = wink, mouse hover = bashful. His eyes follow the pointer.
 */
export function useMascotGestures(mascot: MascotState) {
  const ref = useRef<HTMLButtonElement>(null);
  const press = useRef<PressState>({ down: false, startX: 0, startY: 0, dragging: false, held: false, taps: [] });
  const latest = useRef(mascot); // handlers read the newest state without re-binding
  latest.current = mascot;

  const getSvg = useCallback(() => ref.current?.querySelector("svg") ?? null, []);
  usePupilTracking(getSvg);

  /** Stretches him towards the drag; (0, 0) springs him back. */
  const lean = (dx: number, dy: number) => {
    const svg = getSvg();
    if (!svg) return;
    const resting = dx === 0 && dy === 0;
    svg.classList.toggle("m-springing", resting);
    svg.style.transform = resting ? ""
      : `translate(${clamp(dx / 3, -14, 14)}px, ${clamp(dy / 3, -12, 6)}px) rotate(${clamp(dx / 5, -14, 14)}deg) scale(${1 + clamp(Math.abs(dx) / 600, 0, 0.06)}, ${1 - clamp(Math.abs(dx) / 900, 0, 0.04)})`;
  };

  const onPointerDown = (event: React.PointerEvent) => {
    const state = press.current;
    Object.assign(state, { down: true, startX: event.clientX, startY: event.clientY, dragging: false, held: false });
    ref.current?.setPointerCapture(event.pointerId);
    state.holdTimer = setTimeout(() => {
      state.held = true;
      latest.current.show("love", MASCOT_LINES.hug, false);
    }, MASCOT_GESTURES.holdMs);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const state = press.current;
    if (!state.down) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.dragging && Math.hypot(dx, dy) > MASCOT_GESTURES.dragPx) {
      state.dragging = true;
      clearTimeout(state.holdTimer);
      latest.current.show("shy", MASCOT_LINES.drag, false);
    }
    if (state.dragging) lean(dx, dy);
  };

  const release = (isTap: boolean) => {
    const state = press.current;
    const { show, open, setOpen } = latest.current;
    if (!state.down) return;
    state.down = false;
    clearTimeout(state.holdTimer);
    if (state.dragging) {
      lean(0, 0);
      show("happy", MASCOT_LINES.dragBack, false);
      return;
    }
    if (state.held || !isTap) return;

    const now = Date.now();
    state.taps = [...state.taps.filter((t) => now - t < MASCOT_GESTURES.dizzyWindowMs), now];
    if (state.taps.length >= MASCOT_GESTURES.dizzyTaps) {
      state.taps = [];
      show("dizzy", MASCOT_LINES.dizzy, false);
    } else if (!open) {
      setOpen(true);
      show("happy");
    } else {
      show("happy", pickRandom(MASCOT_LINES.tickle), false);
    }
  };

  const isMouseHover = (event: React.PointerEvent) => event.pointerType === "mouse" && !press.current.down;

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: () => release(true),
    onPointerCancel: () => release(false),
    onDoubleClick: () => latest.current.show("wink", MASCOT_LINES.wink, false),
    onPointerEnter: (event: React.PointerEvent) => isMouseHover(event) && latest.current.show("shy", undefined, false),
    onPointerLeave: (event: React.PointerEvent) => isMouseHover(event) && latest.current.rest(),
    // Keyboard Enter / Space fire a click with detail 0: toggle the bubble.
    onClick: (event: React.MouseEvent) => event.detail === 0 && latest.current.setOpen(!latest.current.open),
  };
}
