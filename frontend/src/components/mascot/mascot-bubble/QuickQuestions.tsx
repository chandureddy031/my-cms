import { MASCOT_QUESTIONS } from "@/constants/mascot";
import type { ShowMascot } from "@/hooks/mascot/types";
import { cn } from "@/utils/cn";

interface QuickQuestionsProps {
  answered?: (typeof MASCOT_QUESTIONS)[number];
  onAsk: ShowMascot;
}

/** Question chips; the answered one is highlighted. */
export function QuickQuestions({ answered, onAsk }: QuickQuestionsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {MASCOT_QUESTIONS.map((q) => (
        <button
          key={q.question}
          onClick={() => onAsk(q.mood, q.answer)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:shadow-soft",
            q === answered ? "border-brand-500 bg-brand-600 text-white" : "border-brand-200 bg-white text-brand-800 hover:bg-brand-50",
          )}
        >
          {q.question}
        </button>
      ))}
    </div>
  );
}
