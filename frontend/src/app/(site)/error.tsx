"use client";
import Link from "next/link";

// Shown when the API can't be reached for a page that has no cached copy yet.
export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-6 my-16 rounded-[2rem] glass p-10 text-center shadow-lift md:mx-12">
      <h1 className="text-shine font-display text-4xl font-bold">We're waking up…</h1>
      <p className="mx-auto mt-3 max-w-md text-gray-600">This page couldn't load just now. Our server may be starting up — please try again in a few seconds.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={reset} className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-glow hover:bg-brand-700">Try again</button>
        <Link href="/" className="rounded-full border border-brand-200 bg-white px-6 py-3 font-semibold text-brand-800 shadow-soft">Home</Link>
      </div>
    </section>
  );
}
