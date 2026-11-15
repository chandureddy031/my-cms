import Link from "next/link";
import { SECTIONS, SECTION_LABELS } from "@/constants";
import { getDonations, getSection } from "@/lib/api";
import { readKey } from "@/lib/admin";
import { Icon } from "@/components/Icon";
import { unlock } from "./actions";
import { btn, input, Notice, Title } from "./ui";

const ICONS = { activities: "spark", reports: "doc", stories: "star", gallery: "image", caretakers: "people", stats: "home" } as const;

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const key = await readKey();

  if (!key)
    return (
      <div className="mx-auto mt-16 max-w-md">
        <div className="glass rounded-[2rem] p-10 shadow-lift">
          <h1 className="font-display text-3xl font-bold">Editor sign-in</h1>
          <p className="mt-2 text-sm text-gray-600">Enter the admin key to manage the website.</p>
          <div className="mt-6"><Notice error={error} /></div>
          <form action={unlock} className="space-y-4">
            <input name="key" type="password" required autoFocus placeholder="Admin key" aria-label="Admin key" className={input} />
            <button className={`${btn} w-full justify-center`}>Unlock</button>
          </form>
        </div>
      </div>
    );

  const [donations, ...sections] = await Promise.all([getDonations(key), ...SECTIONS.map((s) => getSection(s, true))]);
  const total = donations.reduce((t, d) => t + Number(d.amount), 0);

  return (
    <>
      <Title title="Dashboard" sub="Pick what you want to change. Every save goes live on the website immediately." />
      <Notice error={error} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/apple/donations" className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 p-7 text-white shadow-glow transition hover:-translate-y-1 sm:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-100">Donations</p>
          <p className="mt-2 font-display text-5xl font-bold">₹{total.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-brand-50">{donations.length} donations · view all →</p>
        </Link>
        {SECTIONS.map((s, i) => (
          <Link key={s} href={`/apple/${s}`} className="group rounded-3xl border border-brand-100 bg-white p-7 lift">
            <span className="inline-flex rounded-2xl bg-brand-100 p-3 text-brand-700"><Icon name={ICONS[s]} className="h-6 w-6" /></span>
            <p className="mt-4 font-display text-xl font-semibold">{SECTION_LABELS[s]}</p>
            <p className="text-sm text-gray-500">{sections[i].length} items · edit →</p>
          </Link>
        ))}
        <Link href="/apple/settings" className="group rounded-3xl border border-brand-100 bg-white p-7 lift">
          <span className="inline-flex rounded-2xl bg-brand-100 p-3 text-brand-700"><Icon name="info" className="h-6 w-6" /></span>
          <p className="mt-4 font-display text-xl font-semibold">Site settings</p>
          <p className="text-sm text-gray-500">Name, tagline, About text, contact →</p>
        </Link>
      </div>
    </>
  );
}
