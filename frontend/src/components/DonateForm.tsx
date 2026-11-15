"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AMOUNTS } from "@/constants";
import { useDonate } from "@/hooks/useDonate";
import { Icon } from "./Icon";

type Cause = { slug: string; title: string; label: string; image: string | null; body: string };

const input = "w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-soft transition focus:border-brand-400 focus:shadow-glow focus:outline-none";
const step = "flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-glow";
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function DonateForm({ causes, initial }: { causes: Cause[]; initial?: string }) {
  const { status, error, submit } = useDonate();
  const router = useRouter();
  const [cause, setCause] = useState(causes.find((c) => c.slug === initial)?.label ?? causes[0]?.label ?? "");
  const [amount, setAmount] = useState(AMOUNTS[1]);
  const [custom, setCustom] = useState("");
  const total = Number(custom) || amount;

  useEffect(() => {
    if (status !== "done") return;
    const t = setTimeout(() => router.push("/"), 4000);
    return () => clearTimeout(t);
  }, [status, router]);

  if (status === "done")
    return (
      <div role="status" className="glass mx-6 mb-16 rounded-[2rem] px-6 py-16 text-center shadow-lift md:mx-12">
        <div className="mx-auto flex h-24 w-24 animate-float items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-5xl text-white shadow-glow">✓</div>
        <h2 className="text-shine mt-8 font-display text-4xl font-bold">Donation sent successfully!</h2>
        <p className="mt-3 text-gray-600">Thank you for giving {inr(total)} to {cause}. Taking you back to the home page…</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-brand-600 px-7 py-3 font-semibold text-white shadow-glow hover:bg-brand-700">Go to Home now</Link>
      </div>
    );

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }} className="grid gap-8 px-6 pb-16 md:px-12 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-10">
        <fieldset>
          <legend className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold"><span className={step}>1</span> Choose a cause</legend>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {causes.map((c) => (
              <label key={c.slug} className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-brand-100 bg-white shadow-soft transition hover:shadow-lift has-[:checked]:border-brand-500 has-[:checked]:shadow-glow has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-200">
                <input type="radio" name="cause" value={c.label} checked={cause === c.label} onChange={() => setCause(c.label)} className="sr-only" required />
                {c.image && (
                  <div className="relative h-28">
                    <Image src={c.image} alt="" fill sizes="300px" className="object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white" />
                  </div>
                )}
                <div className="p-4 pt-1">
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{c.body}</p>
                </div>
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white/80 text-sm text-transparent shadow-soft transition group-has-[:checked]:bg-brand-600 group-has-[:checked]:text-white">✓</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold"><span className={step}>2</span> Pick an amount</legend>
          <div className="flex flex-wrap gap-3">
            {AMOUNTS.map((a) => (
              <label key={a} className="cursor-pointer rounded-2xl border-2 border-brand-100 bg-white px-6 py-3 font-display text-xl font-semibold shadow-soft transition hover:shadow-lift has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600 has-[:checked]:text-white has-[:checked]:shadow-glow has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-200">
                <input type="radio" name="amount" value={a} checked={!custom && amount === a} onChange={() => { setAmount(a); setCustom(""); }} className="sr-only" />
                {inr(a)}
              </label>
            ))}
            <label className="flex items-center rounded-2xl border-2 border-brand-100 bg-white px-4 shadow-soft has-[input:not(:placeholder-shown)]:border-brand-500 has-[input:not(:placeholder-shown)]:shadow-glow">
              <span className="font-display text-xl text-gray-400">₹</span>
              <input name="custom" type="number" min={1} max={10000000} value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Other amount" aria-label="Other amount" className="w-36 bg-transparent px-2 py-3 font-display text-xl focus:outline-none" />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold"><span className={step}>3</span> Your details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required maxLength={120} placeholder="Full name" aria-label="Full name" autoComplete="name" className={input} />
            <input name="email" type="email" required placeholder="Email" aria-label="Email" autoComplete="email" className={input} />
            <textarea name="message" rows={3} maxLength={1000} placeholder="A message for the team (optional)" aria-label="Message" className={`${input} sm:col-span-2`} />
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 p-8 text-white shadow-lift">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-200">Your gift</p>
          <p className="mt-3 font-display text-5xl font-bold">{inr(total)}</p>
          <p className="mt-2 text-brand-50">to <strong>{cause}</strong></p>
          <ul className="mt-6 space-y-2 text-sm text-brand-50">
            {["Goes directly to the programme", "Audited and reported yearly", "Our team will contact you to complete it"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-200" />{t}</li>
            ))}
          </ul>
          <button disabled={status === "sending"} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-semibold text-brand-800 shadow-soft transition hover:shadow-glow disabled:opacity-60">
            <Icon name="heart" /> {status === "sending" ? "Sending…" : `Donate ${inr(total)}`}
          </button>
          {status === "error" && <p role="alert" className="mt-4 rounded-xl bg-white/15 p-3 text-center text-sm">{error}</p>}
        </div>
      </aside>
    </form>
  );
}
