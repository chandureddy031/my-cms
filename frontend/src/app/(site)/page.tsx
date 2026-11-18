import Link from "next/link";
import Image from "next/image";
import { getSection, getSite } from "@/lib/api";
import { Card, CTA, Grid, Marquee } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export default async function Home() {
  const [site, gallery, stats, activities, stories] = await Promise.all([
    getSite(), getSection("gallery"), getSection("stats"), getSection("activities"), getSection("stories"),
  ]);
  // Hero photos: different from the programme card covers below.
  const hero = [
    { id: 1, image: "/assets/elder-care-5.jpg", title: "Elders resting at the shelter", meta: "Elder Care" },
    { id: 2, image: "/assets/education-3.jpg", title: "Kit distribution with parents", meta: "Education" },
    { id: 3, image: "/assets/agriculture-3.jpg", title: "Bullock-drawn sowing", meta: "Natural Farming" },
  ];

  return (
    <>
      <section className="relative grid items-center gap-10 overflow-hidden px-6 pb-6 pt-14 md:px-12 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div aria-hidden className="absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-brand-200/50 blur-3xl" />
        <div className="relative">
          <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl 2xl:text-7xl">
            <Logo name={site.name} /> <span className="text-shine">NGO</span>
          </h1>
          <p className="mt-5 font-display text-2xl text-brand-900 md:text-3xl">{site.tagline}</p>
          <p className="mt-5 max-w-xl text-gray-600">{site.about}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 font-semibold text-white shadow-glow transition hover:brightness-110">
              <Icon name="heart" /> Donate
            </Link>
            <Link href="/activities" className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-brand-800 shadow-soft transition hover:shadow-lift">
              Explore our work <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {/* Fixed-size, centred group: same 1-2-3 layout whether the sidebar is open or closed. */}
        <div className="relative mx-auto hidden h-[30rem] w-full max-w-[30rem] lg:block">
          {hero.map((a, i) => (
            <div key={a.id}
              className={`absolute overflow-hidden rounded-[2rem] ring-8 ring-white shadow-lift transition hover:z-10 hover:scale-105
                ${["left-0 top-6 h-72 w-[48%] -rotate-6", "right-[3%] top-0 h-80 w-[52%] rotate-3", "bottom-0 left-[22%] h-60 w-[58%] -rotate-2"][i]}`}>
              <Image src={a.image} alt={a.title} fill sizes="300px" className="object-cover" priority />
              <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-brand-800">{a.meta}</span>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={gallery.filter((g, i, a) => a.findIndex((x) => x.parent === g.parent) === i || i % 5 === 1)} />

      <section className="grid grid-cols-2 gap-5 px-6 md:grid-cols-4 md:px-12">
        {stats.map((s) => (
          <div key={s.id} className="reveal glass rounded-3xl p-7 text-center shadow-soft transition hover:shadow-glow">
            <p className="font-display text-4xl font-bold text-shine">{s.body}</p>
            <p className="mt-1 text-sm font-semibold text-gray-600">{s.title}</p>
          </div>
        ))}
      </section>

      <div className="px-6 pb-8 pt-20 md:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">What we do</p>
        <h2 className="mt-2 font-display text-4xl font-bold">Six ways we change lives</h2>
      </div>
      <Grid>{activities.map((a) => <Card key={a.id} item={a} href={`/activities/${a.slug}`} cta="See how we work" />)}</Grid>

      <div className="px-6 pb-8 md:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Real lives</p>
        <h2 className="mt-2 font-display text-4xl font-bold">Success stories</h2>
      </div>
      <Grid>{stories.slice(0, 3).map((s) => <Card key={s.id} item={s} href={`/success-stories/${s.slug}`} cta="Read story" />)}</Grid>

      <CTA title="Your kindness reaches a real person." sub="Choose a cause and give in under a minute. Every rupee goes to the work you choose." />
    </>
  );
}
