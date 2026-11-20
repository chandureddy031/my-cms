import { INTERVENTIONS, OBJECTIVES, PARTNERS } from "../../constants/content";

/** Objectives as a list; interventions and collaborations as plain chips and tiles. */
export function ObjectivesInterventions() {
  return (
    <div className="grid gap-14 lg:grid-cols-2">
      <div>
        <h3 className="soil-h3">Objectives</h3>
        <ul className="mt-4">
          {OBJECTIVES.map((objective) => (
            <li key={objective} className="relative border-b border-soil-line py-3.5 pl-7 before:absolute before:left-1 before:top-6 before:h-2.5 before:w-2.5 before:rounded-full before:bg-soil-brand">
              {objective}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="soil-h3">Interventions</h3>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {INTERVENTIONS.map((item) => <li key={item} className="rounded border border-soil-line bg-soil-paper px-4 py-2">{item}</li>)}
        </ul>
        <h3 className="soil-h3 mt-12">Collaborations</h3>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PARTNERS.map((partner) => <li key={partner} className="soil-card grid min-h-24 place-items-center p-3 text-center font-semibold text-soil-ink">{partner}</li>)}
        </ul>
      </div>
    </div>
  );
}
