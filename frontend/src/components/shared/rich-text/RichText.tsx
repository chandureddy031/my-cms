import { parseRichText } from "./parseRichText";

interface RichTextProps {
  text: string;
}

/** CMS text as paragraphs, headings and bullet cards. */
export function RichText({ text }: RichTextProps) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed text-gray-700">
      {parseRichText(text).map((block, i) => {
        if (block.kind === "heading")
          return (
            <div key={i} className="space-y-5">
              <h2 className="pt-4 font-display text-2xl font-semibold text-brand-900">{block.text}</h2>
              {block.after && <p className="whitespace-pre-line">{block.after}</p>}
            </div>
          );
        if (block.kind === "list")
          return (
            <ul key={i} className="grid gap-3 sm:grid-cols-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 rounded-2xl bg-brand-50 p-4 shadow-soft">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 shadow-glow" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        return <p key={i} className="whitespace-pre-line">{block.text}</p>;
      })}
    </div>
  );
}

/** RichText on a frosted panel (About story, activity details). */
export function RichTextPanel({ text }: RichTextProps) {
  return <article className="reveal glass rounded-[2rem] p-8 shadow-soft md:p-12"><RichText text={text} /></article>;
}
