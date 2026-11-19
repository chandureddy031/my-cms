import type { MascotEvent, Mood } from "./types";

const EVENT_NAME = "apple:mascot";

/** Makes the mascot react from any component: emitMascot("celebrate", "Thank you!"). */
export function emitMascot(mood: Mood, text?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<MascotEvent>(EVENT_NAME, { detail: { mood, text } }));
}

/** Listens for emitMascot calls; returns the unsubscribe function. */
export function onMascotEvent(listener: (event: MascotEvent) => void) {
  const handle = (event: Event) => listener((event as CustomEvent<MascotEvent>).detail);
  window.addEventListener(EVENT_NAME, handle);
  return () => window.removeEventListener(EVENT_NAME, handle);
}
