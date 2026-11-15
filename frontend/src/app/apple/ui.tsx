// Small shared bits for CMS pages.
export const input = "w-full rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm shadow-soft focus:border-brand-400 focus:shadow-glow focus:outline-none";
export const btn = "inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-700";
export const ghost = "inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-soft hover:shadow-glow";

export function Notice({ error, saved }: { error?: string; saved?: string }) {
  if (error) return <p role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>;
  if (saved) return <p role="status" className="mb-6 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm text-brand-800">{saved === "deleted" ? "Deleted." : saved === "1" ? "Saved." : `Saved “${saved}”.`} The website is updated.</p>;
  return null;
}

export function Title({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">{title}</h1>
        {sub && <p className="mt-1 text-gray-600">{sub}</p>}
      </div>
      {children}
    </div>
  );
}
