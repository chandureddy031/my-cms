interface StepLegendProps {
  step: number;
  children: React.ReactNode;
}

/** Numbered heading of a form step ("1  Choose a cause"). */
export function StepLegend({ step, children }: StepLegendProps) {
  return (
    <legend className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-glow">{step}</span> {children}
    </legend>
  );
}
