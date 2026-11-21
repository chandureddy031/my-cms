import type { Metadata } from "next";
import Board from "@/chandu/components/Board";
import Photo from "@/chandu/components/Photo";
import { getContent } from "@/chandu/controller/content";

export const metadata: Metadata = { title: "About Us" };


const initials = (name: string) => name.split(/[\s.]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

export default function AboutPage() {
  const { about } = getContent();
  return (
    <>
      <Board title="About APPLES" intro={about.intro}>
        <p className="max-w-4xl text-lg leading-relaxed">{about.overview}</p>
      </Board>

      <Board title="Our inspiration" tone="tint">
        <p className="max-w-4xl text-lg leading-relaxed">{about.inspiration}</p>
      </Board>

      <Board>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-gradient-to-br from-white/80 to-amber-50/80 p-6 shadow-sm ring-1 ring-orange-100">
            <h3 className="text-2xl font-bold grad-text">Vision</h3>
            <p className="mt-2 leading-relaxed">{about.vision}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-white/80 to-amber-50/80 p-6 shadow-sm ring-1 ring-orange-100">
            <h3 className="text-2xl font-bold grad-text">Mission</h3>
            <p className="mt-2 leading-relaxed">{about.mission}</p>
          </div>
        </div>
      </Board>

      <Board title="Aims & objectives">
        <ul className="grid gap-3 text-lg">
          {about.aims.map((aim) => <li key={aim} className="border-b border-stone-200 pb-3 last:border-0">{aim}</li>)}
        </ul>
      </Board>

      <Board title="Our team" tone="tint">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {about.team.map(({ name, role, photo }) => (
            <div key={name} className="rounded-xl border border-stone-200 p-6 text-center">
              {photo ? (
                <Photo src={photo} alt={name} className="mx-auto size-24 !rounded-full ring-4 ring-white shadow-md" sizes="96px" />
              ) : (
              <span className="mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br from-orange-700 to-amber-500 text-2xl font-bold text-white">{initials(name)}</span>
              )}
              <h3 className="mt-4 font-semibold">{name}</h3>
              <p className="text-sm text-stone-600">{role}</p>
            </div>
          ))}
        </div>
      </Board>
    </>
  );
}
