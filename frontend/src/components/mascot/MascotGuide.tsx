"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FAQ } from "@/constants/mascot";
import { useMascot } from "@/hooks/useMascot";
import { useMascotTouch } from "@/hooks/useMascotTouch";
import { MascotBoy } from "./MascotBoy";
import { Icon } from "../Icon";

// Types the message out letter by letter (instant for reduced motion); screen readers get the full text.
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(text.length);
    setN(0);
    const id = setInterval(() => setN((k) => (k >= text.length ? (clearInterval(id), k) : k + 1)), 16);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p className="text-sm leading-relaxed text-ink">
      <span className="sr-only" aria-live="polite">{text}</span>
      <span aria-hidden>{[...text].slice(0, n).join("")}<span className={n < text.length ? "m-caret" : "hidden"}>▍</span></span>
    </p>
  );
}

// Floating guide fixed at the bottom-right: speech bubble with page tips, quick answers, and a boy you can play with. No AI.
export function MascotGuide() {
  const m = useMascot();
  const touch = useMascotTouch(m);
  const { mood, text, open, hidden, setOpen, show, hide, unhide } = m;

  if (hidden)
    return (
      <button onClick={unhide} aria-label="Show Appu, the guide" className="glass fixed bottom-4 right-4 z-30 h-12 w-12 overflow-hidden rounded-full shadow-lift transition hover:shadow-glow">
        <MascotBoy mood="idle" className="h-16 w-16 -translate-x-2 -translate-y-1" />
      </button>
    );

  return (
    <div className="fixed bottom-3 right-3 z-30 flex flex-col items-end gap-2 md:bottom-5 md:right-5">
      {open && (
        <div role="dialog" aria-label="Appu, your guide" className="m-bubble glass relative w-[min(20rem,calc(100vw-1.5rem))] rounded-3xl p-4 shadow-lift">
          <div className="flex items-start justify-between gap-2">
            <Typed text={text} />
            <button onClick={() => setOpen(false)} aria-label="Close" className="-mr-1 -mt-1 rounded-full p-1 text-gray-500 hover:bg-brand-50"><Icon name="close" className="h-4 w-4" /></button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FAQ.map((f) => (
              <button key={f.q} onClick={() => show(f.mood, f.a)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:shadow-soft ${text === f.a ? "border-brand-500 bg-brand-600 text-white" : "border-brand-200 bg-white text-brand-800 hover:bg-brand-50"}`}>
                {f.q}
              </button>
            ))}
          </div>
          {FAQ.filter((f) => f.a === text && f.href).map((f) => (
            <Link key={f.q} href={f.href!} onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-700">
              {f.label} <Icon name="arrow" className="h-4 w-4" />
            </Link>
          ))}
          <p className="mt-3 text-center text-[11px] text-gray-400">Tip: tap me, hold me, or try to drag me 😉 · <button onClick={hide} className="underline hover:text-gray-600">Hide</button></p>
          <span aria-hidden className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 border-b border-r border-white/90 bg-white/80" />
        </div>
      )}
      <button
        {...touch}
        aria-label={open ? "Appu, the guide (bubble open)" : "Open Appu, the guide"}
        aria-expanded={open}
        className="h-24 w-20 touch-none select-none drop-shadow-[0_10px_18px_rgb(20_83_45/0.25)] md:h-28 md:w-24"
      >
        <MascotBoy mood={mood} className="h-full w-full" />
      </button>
    </div>
  );
}
