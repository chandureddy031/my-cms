import type { Mood } from "@/constants/mascot";

// Lets any component make the mascot react: mascot("celebrate", "Thank you!").
export type MascotEvent = { mood: Mood; text?: string };
const EVENT = "apple:mascot";

export function mascot(mood: Mood, text?: string) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent<MascotEvent>(EVENT, { detail: { mood, text } }));
}

export function onMascot(fn: (e: MascotEvent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<MascotEvent>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
