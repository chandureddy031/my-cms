"use client";
import { useMascot, useMascotGestures } from "@/hooks/mascot";
import { MascotBubble } from "./mascot-bubble/MascotBubble";
import { MascotFigure } from "./mascot-figure/MascotFigure";

/** Appu in the bottom-right corner: tap him for tips and quick answers, or play with him. No AI. */
export function MascotGuide() {
  const mascot = useMascot();
  const gestures = useMascotGestures(mascot);

  if (mascot.hidden)
    return (
      <button onClick={mascot.unhide} aria-label="Show Appu, the guide" className="glass fixed bottom-4 right-4 z-30 h-12 w-12 overflow-hidden rounded-full shadow-lift transition hover:shadow-glow">
        <MascotFigure mood="idle" className="h-16 w-16 -translate-x-2 -translate-y-1" />
      </button>
    );

  return (
    <div className="fixed bottom-3 right-3 z-30 flex flex-col items-end gap-2 md:bottom-5 md:right-5">
      {mascot.open && <MascotBubble mascot={mascot} />}
      <button
        {...gestures}
        aria-label={mascot.open ? "Appu, the guide (bubble open)" : "Open Appu, the guide"}
        aria-expanded={mascot.open}
        className="h-24 w-20 touch-none select-none drop-shadow-[0_10px_18px_rgb(20_83_45/0.25)] md:h-28 md:w-24"
      >
        <MascotFigure mood={mascot.mood} className="h-full w-full" />
      </button>
    </div>
  );
}
