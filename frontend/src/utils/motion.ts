export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const pickRandom = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
