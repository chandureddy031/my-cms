import type { Mood } from "@/hooks/mascot";
import { cn } from "@/utils/cn";
import { MOUTHS } from "./mouths";

interface MascotFigureProps {
  mood: Mood;
  className?: string;
}

/**
 * Appu, drawn in parts so CSS can animate each one per mood (styles/mascot.css).
 * The pupils follow the pointer through the --lx / --ly CSS variables on the <svg>.
 */
export function MascotFigure({ mood, className }: MascotFigureProps) {
  const open = MOUTHS[mood].endsWith("Z");
  return (
    <svg viewBox="0 0 120 150" className={cn("mascot", className)} data-mood={mood} aria-hidden>
      <defs>
        <radialGradient id="m-skin" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#ffe2c6" /><stop offset="1" stopColor="#f0b48a" /></radialGradient>
        <linearGradient id="m-hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b3a22" /><stop offset="1" stopColor="#2e1a0e" /></linearGradient>
        <linearGradient id="m-shirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34d058" /><stop offset="1" stopColor="#15803d" /></linearGradient>
        <linearGradient id="m-pants" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b5b8f" /><stop offset="1" stopColor="#1e3a5f" /></linearGradient>
      </defs>

      <ellipse className="m-shadow" cx="60" cy="145" rx="27" ry="4.5" fill="#14532d" opacity=".16" />

      <g className="m-root">
        {/* backpack peeking out behind */}
        <rect x="36" y="86" width="48" height="34" rx="12" fill="#f59e0b" />
        <rect x="38" y="104" width="44" height="10" rx="4" fill="#d97706" opacity=".6" />
        {/* legs + sneakers */}
        <rect x="47" y="117" width="10" height="20" rx="4" fill="url(#m-pants)" />
        <rect x="63" y="117" width="10" height="20" rx="4" fill="url(#m-pants)" />
        <g className="m-shoe-l"><path d="M42 140 q0 -6 9 -6 q8 0 8 6z" fill="#fff" stroke="#cbd5e1" /><path d="M46 137 h8" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" /></g>
        <g className="m-shoe-r"><path d="M61 140 q0 -6 9 -6 q8 0 8 6z" fill="#fff" stroke="#cbd5e1" /><path d="M65 137 h8" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" /></g>
        {/* body: T-shirt, collar, leaf logo, backpack straps */}
        <rect x="40" y="83" width="40" height="40" rx="14" fill="url(#m-shirt)" />
        <path d="M53 84 Q60 91 67 84" fill="none" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 86 L47 120 M76 86 L73 120" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <path className="m-leaf" d="M58 100 q7 -8 12 -1 q-5 7 -12 1z" fill="#dcfce7" />
        <path d="M58 100 l-3 3" stroke="#dcfce7" strokeWidth="1.5" strokeLinecap="round" />

        {/* arms (pivot at the shoulder) */}
        <g className="m-arm-l"><rect x="30" y="87" width="11" height="28" rx="5.5" fill="url(#m-shirt)" /><circle cx="35.5" cy="116" r="5.8" fill="url(#m-skin)" /></g>
        <g className="m-arm-r"><rect x="79" y="87" width="11" height="28" rx="5.5" fill="url(#m-shirt)" /><circle cx="84.5" cy="116" r="5.8" fill="url(#m-skin)" /></g>

        {/* head */}
        <g className="m-head">
          <rect x="55" y="73" width="10" height="13" rx="4" fill="#e8ad84" />
          <circle cx="35" cy="53" r="6.5" fill="url(#m-skin)" /><circle cx="85" cy="53" r="6.5" fill="url(#m-skin)" />
          <circle cx="60" cy="51" r="26.5" fill="url(#m-skin)" />
          <path d="M33 50 Q31 19 60 20 Q90 20 87 50 Q82 37 70 35 Q73 42 62 42 Q64 34 52 35 Q41 37 33 50Z" fill="url(#m-hair)" />
          <path className="m-tuft" d="M60 21 Q57 9 66 6 Q61 13 66 20Z" fill="url(#m-hair)" />
          <ellipse className="m-cheek" cx="42" cy="61" rx="5.5" ry="3.2" fill="#fb7185" />
          <ellipse className="m-cheek" cx="78" cy="61" rx="5.5" ry="3.2" fill="#fb7185" />
          <g className="m-brows" stroke="#3b2314" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path className="m-brow-l" d="M43 40 Q48 37 54 40" /><path className="m-brow-r" d="M66 40 Q72 37 77 40" />
          </g>
          <g className="m-eye m-eye-l">
            <ellipse cx="49" cy="50" rx="5.6" ry="6.4" fill="#fff" />
            <g className="m-pupil"><circle cx="49" cy="51" r="3.6" fill="#1f2937" /><circle cx="50.4" cy="49.4" r="1.3" fill="#fff" /></g>
            <path className="m-spiral" d="M49 51 m-0.5 0 a0.5 0.5 0 1 1 1 0 a1.5 1.5 0 1 1 -3 0 a2.6 2.6 0 1 1 5.2 0" fill="none" stroke="#1f2937" strokeWidth="1.2" />
          </g>
          <g className="m-eye m-eye-r">
            <ellipse cx="71" cy="50" rx="5.6" ry="6.4" fill="#fff" />
            <g className="m-pupil"><circle cx="71" cy="51" r="3.6" fill="#1f2937" /><circle cx="72.4" cy="49.4" r="1.3" fill="#fff" /></g>
            <path className="m-spiral" d="M71 51 m-0.5 0 a0.5 0.5 0 1 1 1 0 a1.5 1.5 0 1 1 -3 0 a2.6 2.6 0 1 1 5.2 0" fill="none" stroke="#1f2937" strokeWidth="1.2" />
          </g>
          <path className="m-mouth" d={MOUTHS[mood]} fill={open ? "#7f1d1d" : "none"} stroke="#7f1d1d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {open && <path d="M55 67 Q60 70.5 65 67" fill="#fb7185" opacity=".8" />}
          <path className="m-sweat" d="M84 36 q3 5 0 7 q-3 -2 0 -7z" fill="#93c5fd" />
        </g>
      </g>

      {/* mood props */}
      {mood === "sleepy" && <g className="m-zzz" fill="#15803d" fontWeight="800" fontFamily="system-ui"><text x="88" y="30" fontSize="12">z</text><text x="96" y="20" fontSize="15">Z</text></g>}
      {mood === "thinking" && <text className="m-prop" x="90" y="28" fontSize="20" fontWeight="800" fill="#15803d">?</text>}
      {mood === "surprised" && <text className="m-prop" x="91" y="28" fontSize="22" fontWeight="900" fill="#ca8a04">!</text>}
      {mood === "celebrate" && (
        <g className="m-confetti">
          {["#16a34a", "#ca8a04", "#0d9488", "#fb7185", "#65a30d", "#3b82f6"].map((c, i) => <rect key={i} x={14 + i * 17} y={8 + (i % 3) * 7} width="5" height="8" rx="1.5" fill={c} />)}
        </g>
      )}
      {mood === "love" && (
        <g className="m-hearts" fill="#f43f5e">
          {[[26, 34], [92, 28], [60, 10]].map(([x, y], i) => <path key={i} d={`M${x} ${y} c-3 -4 -9 -1 -6 4 l6 6 l6 -6 c3 -5 -3 -8 -6 -4z`} />)}
        </g>
      )}
      {(mood === "happy" || mood === "hello" || mood === "excited" || mood === "wink") && <path className="m-prop" d="M95 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#ca8a04" />}
    </svg>
  );
}
