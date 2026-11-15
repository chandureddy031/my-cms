import Image from "next/image";
import Link from "next/link";
import type { Item } from "@/lib/api";
import { Icon } from "./Icon";

export function PageHeader({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-14 md:px-12 md:pt-20">
      <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 animate-float rounded-full bg-brand-200/60 blur-3xl" />
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">{eyebrow}</p>}
      <h1 className="text-shine mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-gray-600">{sub}</p>}
    </section>
  );
}

// Image card; becomes a link when href is given.
export function Card({ item, href, cta = "Read more" }: { item: Item; href?: string; cta?: string }) {
  const inner = (
    <>
      {item.image && (
        <div className="relative h-56 overflow-hidden">
          <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent" />
          {item.meta && <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-brand-800">{item.meta}</span>}
        </div>
      )}
      <div className="p-6">
        {!item.image && item.meta && <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{item.meta}</span>}
        <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.title}</h3>
        {item.body && <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>}
        {href && <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">{cta} <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>}
      </div>
    </>
  );
  const cls = "reveal group block overflow-hidden rounded-3xl border border-brand-100 bg-white lift";
  return href ? <Link href={href} className={cls}>{inner}</Link> : <article className={cls}>{inner}</article>;
}

export function Grid({ children, empty }: { children: React.ReactNode[]; empty?: string }) {
  if (!children.length) return <p className="px-6 py-16 text-center text-gray-500">{empty ?? "Content coming soon."}</p>;
  return <div className="grid gap-7 px-6 pb-16 sm:grid-cols-2 md:px-12 xl:grid-cols-3">{children}</div>;
}

export function Marquee({ items }: { items: Item[] }) {
  const imgs = items.filter((i) => i.image);
  return (
    <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {[...imgs, ...imgs].map((i, k) => (
          <div key={k} className="relative h-64 w-96 shrink-0 overflow-hidden rounded-3xl shadow-lift">
            <Image src={i.image!} alt={i.title} fill sizes="384px" className="object-cover" style={{ objectPosition: FOCUS[k % FOCUS.length] }} />
            <span className="glass absolute bottom-3 left-3 rounded-full px-4 py-1.5 text-sm font-semibold text-brand-900">{i.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Varies the crop when the same photo is reused.
export const FOCUS = ["center", "20% 30%", "80% 60%", "50% 15%", "30% 85%"];

// Renders CMS text: blank line = new block, "## " = heading, "- " lines = list.
export function Rich({ text }: { text: string }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed text-gray-700">
      {text.split(/\n\s*\n/).map((b, i) => {
        const lines = b.trim().split("\n");
        if (b.trim().startsWith("## ")) return <h2 key={i} className="pt-4 font-display text-2xl font-semibold text-brand-900">{b.trim().slice(3)}</h2>;
        if (lines.every((l) => l.startsWith("- ")))
          return (
            <ul key={i} className="grid gap-3 sm:grid-cols-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 rounded-2xl bg-brand-50 p-4 shadow-soft">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 shadow-glow" />
                  <span>{l.slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        return <p key={i} className="whitespace-pre-line">{b.trim()}</p>;
      })}
    </div>
  );
}

export function Avatar({ name, image, size = "h-24 w-24 text-3xl" }: { name: string; image?: string | null; size?: string }) {
  const initials = name.replace(/^(Dr|S)\.\s*/, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return image ? (
    <div className={`relative shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-glow ${size}`}>
      <Image src={image} alt={name} fill sizes="200px" className="object-cover" />
    </div>
  ) : (
    <div aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display font-bold text-white ring-4 ring-white shadow-glow ${size}`}>
      {initials}
    </div>
  );
}

export function PersonCard({ p }: { p: Item }) {
  return (
    <Link href={`/caretakers/${p.slug}`} className="reveal group flex flex-col items-center rounded-3xl border border-brand-100 bg-white p-8 text-center lift">
      <Avatar name={p.title} image={p.image} />
      <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-600">{p.meta}</p>
      <p className="mt-3 text-sm text-gray-600">{p.body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">View profile <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  );
}

export function Back({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
      <Icon name="chevron" className="h-4 w-4" /> {label}
    </Link>
  );
}

export function CTA({ title, sub, href = "/donate", label = "Donate now" }: { title: string; sub: string; href?: string; label?: string }) {
  return (
    <section className="reveal mx-6 my-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white shadow-lift md:mx-12 md:p-14">
      <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-brand-50">{sub}</p>
      <Link href={href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-brand-800 shadow-soft transition hover:shadow-glow">
        {label} <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </section>
  );
}
