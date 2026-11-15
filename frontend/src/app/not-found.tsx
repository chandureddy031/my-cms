import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo name="APPLE" className="text-4xl" />
      <h1 className="text-shine mt-8 font-display text-6xl font-bold">404</h1>
      <p className="mt-3 text-gray-600">We couldn't find that page.</p>
      <Link href="/" className="mt-8 rounded-full bg-brand-600 px-7 py-3 font-semibold text-white shadow-glow hover:bg-brand-700">Back to home</Link>
    </main>
  );
}
