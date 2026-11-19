"use client";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { MASCOT_QUESTIONS } from "@/constants/mascot";
import type { MascotState } from "@/hooks/mascot";
import { QuickQuestions } from "./QuickQuestions";
import { TypedText } from "./TypedText";

interface MascotBubbleProps {
  mascot: MascotState;
}

/** Speech bubble: the message, quick questions, and a link for the answered question. */
export function MascotBubble({ mascot }: MascotBubbleProps) {
  const { text, show, setOpen, hide } = mascot;
  const answered = MASCOT_QUESTIONS.find((q) => q.answer === text);
  const close = () => setOpen(false);

  return (
    <div role="dialog" aria-label="Appu, your guide" className="m-bubble glass relative w-[min(20rem,calc(100vw-1.5rem))] rounded-3xl p-4 shadow-lift">
      <div className="flex items-start justify-between gap-2">
        <TypedText text={text} />
        <button onClick={close} aria-label="Close" className="-mr-1 -mt-1 rounded-full p-1 text-gray-500 hover:bg-brand-50"><Icon name="close" className="h-4 w-4" /></button>
      </div>
      <QuickQuestions answered={answered} onAsk={show} />
      {answered?.link && (
        <Link href={answered.link.href} onClick={close} className="mt-3 flex items-center justify-center gap-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-700">
          {answered.link.label} <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
      <p className="mt-3 text-center text-[11px] text-gray-400">Tip: tap me, hold me, or try to drag me 😉 · <button onClick={hide} className="underline hover:text-gray-600">Hide</button></p>
      <span aria-hidden className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 border-b border-r border-white/90 bg-white/80" />
    </div>
  );
}
