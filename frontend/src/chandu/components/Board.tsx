const TONES = {
  white: "frost",
  tint: "bg-gradient-to-br from-amber-100/70 via-orange-50/55 to-rose-100/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
  dark: "glass-deep text-white",
};

/** A frosted board that scrolls over the logo background. Every page is built from these. */
export default function Board({ title, intro, id, tone = "white", children }: {
  title?: string; intro?: string; id?: string; tone?: keyof typeof TONES; children?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={`relative mx-auto my-10 w-[calc(100%-2rem)] max-w-6xl scroll-mt-24 overflow-hidden rounded-3xl p-6 shadow-2xl shadow-orange-900/15 sm:p-10 ${TONES[tone]}`}>
      {title && (
        <h2 className={`text-3xl font-semibold sm:text-4xl ${dark ? "text-amber-100" : "grad-text"}`}>
          {title}
          <span className="mt-3 block h-1 w-16 rounded-full grad-warm" />
        </h2>
      )}
      {intro && <p className={`mt-3 max-w-3xl text-lg ${dark ? "text-white/80" : "text-stone-600"}`}>{intro}</p>}
      {children && <div className={title || intro ? "mt-8" : ""}>{children}</div>}
    </section>
  );
}
