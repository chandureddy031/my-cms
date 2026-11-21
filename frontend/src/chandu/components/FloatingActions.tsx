import Link from "next/link";

/** "See our work" and "Donate" pinned bottom-right, so they stay visible while scrolling. */
export default function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      <Link href="/chandu/activities" className="btn-line shadow-lg">See our work</Link>
      <Link href="/chandu/donate" className="btn shadow-lg">Donate</Link>
    </div>
  );
}
