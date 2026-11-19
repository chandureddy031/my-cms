import { ORG_VALUES } from "./constants";
import { ValueCard } from "./ValueCard";

export function OrgValues() {
  return (
    <section className="page-x grid gap-5 py-16 sm:grid-cols-2 xl:grid-cols-4">
      {ORG_VALUES.map((value) => <ValueCard key={value.title} {...value} />)}
    </section>
  );
}
