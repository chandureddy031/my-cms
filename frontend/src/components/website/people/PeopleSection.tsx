import { TEAM_GROUP } from "@/constants/content";
import type { ContentItem } from "@/types/content";
import { WebsiteSection } from "../shared/WebsiteSection";
import { PersonCard } from "./PersonCard";

function PeopleGrid({ title, people }: { title: string; people: ContentItem[] }) {
  if (!people.length) return null;
  return (
    <div>
      <h3 className="font-display text-2xl font-medium text-ws-ink">{title}</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((person) => <PersonCard key={person.id} person={person} />)}
      </div>
    </div>
  );
}

/** The leadership team, then the caretakers. */
export function PeopleSection({ people }: { people: ContentItem[] }) {
  return (
    <WebsiteSection id="people" eyebrow="Our people" title="The hands behind the work." className="bg-ws-card">
      <div className="space-y-16">
        <PeopleGrid title="Team" people={people.filter((p) => p.parent === TEAM_GROUP)} />
        <PeopleGrid title="Caretakers" people={people.filter((p) => p.parent !== TEAM_GROUP)} />
      </div>
    </WebsiteSection>
  );
}
