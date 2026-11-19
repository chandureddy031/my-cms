import { DONATE_SECTION_ID, TOP_SECTION_ID, WEBSITE_SECTIONS } from "../constants";

/** Sticky top bar: name, section links (a native dropdown on phones) and Donate. */
export function WebsiteHeader({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ws-line bg-ws-paper/85 backdrop-blur">
      <div className="ws-x flex h-16 items-center justify-between gap-6">
        <a href={`#${TOP_SECTION_ID}`} className="font-display text-xl font-semibold tracking-tight text-ws-ink">
          {name}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ws-muted lg:flex">
          {WEBSITE_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="transition hover:text-ws-ink">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <details className="group relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-ws-line px-4 py-2 text-sm text-ws-ink [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav className="absolute right-0 mt-2 flex w-48 flex-col rounded-2xl border border-ws-line bg-ws-card p-2 shadow-lg">
              {WEBSITE_SECTIONS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="rounded-xl px-3 py-2 text-sm text-ws-ink hover:bg-ws-paper">{label}</a>
              ))}
            </nav>
          </details>
          <a href={`#${DONATE_SECTION_ID}`} className="ws-button !py-2">Donate</a>
        </div>
      </div>
    </header>
  );
}
