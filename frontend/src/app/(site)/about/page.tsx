import { getSection, getSite } from "@/lib/api";
import { CTA, Grid, PageHeader, PersonCard } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata = { title: "About Us" };

const VALUES = [
  ["heart", "Compassion", "We treat every person as family."],
  ["doc", "Transparency", "Audited accounts and public reports every year."],
  ["people", "Community-led", "Our caretakers come from the villages they serve."],
  ["spark", "Lasting change", "We build skills and systems, not dependence."],
];

export default async function About() {
  const [site, people, activities] = await Promise.all([getSite(), getSection("caretakers"), getSection("activities")]);
  const team = people.filter((p) => p.parent === "team");
  return (
    <>
      <PageHeader eyebrow="About us" title={`Who we are at ${site.name}`} sub={site.about} />

      <section className="grid gap-6 px-6 md:grid-cols-2 md:px-12">
        {[["Our Mission", site.mission], ["Our Vision", site.vision]].map(([t, b], i) => (
          <div key={t} className={`reveal rounded-[2rem] p-10 shadow-lift ${i ? "glass" : "bg-gradient-to-br from-brand-700 to-brand-500 text-white"}`}>
            <h2 className="font-display text-3xl font-bold">{t}</h2>
            <p className={`mt-4 text-lg ${i ? "text-gray-600" : "text-brand-50"}`}>{b}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 px-6 py-16 sm:grid-cols-2 md:px-12 xl:grid-cols-4">
        {VALUES.map(([icon, t, b]) => (
          <div key={t} className="reveal rounded-3xl border border-brand-100 bg-white p-7 lift">
            <span className="inline-flex rounded-2xl bg-brand-100 p-3 text-brand-700 shadow-glow"><Icon name={icon} className="h-6 w-6" /></span>
            <h3 className="mt-4 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-gray-600">{b}</p>
          </div>
        ))}
      </section>

      <div className="px-6 pb-8 md:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Our people</p>
        <h2 className="mt-2 font-display text-4xl font-bold">The team behind the work</h2>
      </div>
      <Grid>{team.map((p) => <PersonCard key={p.id} p={p} />)}</Grid>

      <section className="px-6 md:px-12">
        <h2 className="font-display text-3xl font-bold">What we work on</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {activities.map((a) => (
            <a key={a.id} href={`/activities/${a.slug}`} className="glass rounded-full px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-soft transition hover:shadow-glow">{a.title}</a>
          ))}
        </div>
      </section>

      <CTA title="Walk with us." sub="Volunteer, partner or donate — every hand helps a village move forward." />
    </>
  );
}
