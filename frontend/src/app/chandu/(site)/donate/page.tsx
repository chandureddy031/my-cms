import type { Metadata } from "next";
import Board from "@/chandu/components/Board";
import { getContent, telHref } from "@/chandu/controller/content";

export const metadata: Metadata = { title: "Donate" };

export default async function DonatePage({ searchParams }: PageProps<"/donate">) {
  const { cause } = await searchParams;
  const { site, donate, programmes } = getContent();
  return (
    <Board title="Donate" intro={donate.intro}>
      <div className="grid gap-10 lg:grid-cols-2">
        <ul className="grid content-start gap-4 text-lg">
          {donate.promises.map((p) => <li key={p} className="border-b border-stone-200 pb-4">✓ {p}</li>)}
        </ul>
        <div>
          <h3 className="text-xl font-semibold">Programmes you can support</h3>
          <ul className="mt-4 grid gap-2">
            {programmes.map((p) => {
              const subject = encodeURIComponent(`Donation for ${p.title}`);
              return (
                <li key={p.slug}>
                  <a href={`mailto:${site.email}?subject=${subject}`}
                    className={`block rounded-xl border-2 px-4 py-3 transition hover:border-orange-400 ${cause === p.slug ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50" : "border-stone-200"}`}>
                    {p.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telHref(site.phone)} className="btn">Call {site.phone}</a>
            <a href={`mailto:${site.email}?subject=Donation`} className="btn-line">Email us</a>
          </div>
        </div>
      </div>
    </Board>
  );
}
