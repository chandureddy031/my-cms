"use client";
import { FaultNotice } from "@/components/FaultNotice";

export default function CmsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto mt-10 max-w-lg rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-soft">
      <h1 className="font-display text-3xl font-bold">Couldn't load this page</h1>
      <FaultNotice />
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={reset} className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Try again</button>
        <a href="/apple" className="rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-800">Dashboard</a>
      </div>
    </div>
  );
}
