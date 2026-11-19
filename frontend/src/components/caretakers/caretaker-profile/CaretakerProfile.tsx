import { RichText } from "@/components/shared";
import { Avatar } from "@/components/ui";
import type { ContentItem } from "@/types/content";
import { ContactButtons } from "./ContactButtons";

interface CaretakerProfileProps {
  person: ContentItem;
}

/** Photo, name and contact buttons on the left; intro and story on the right. */
export function CaretakerProfile({ person }: CaretakerProfileProps) {
  return (
    <section className="page-x grid gap-8 py-8 lg:grid-cols-[22rem_1fr]">
      <div className="reveal glass flex min-w-0 flex-col items-center rounded-[2rem] p-6 text-center shadow-lift md:p-10 lg:sticky lg:top-6 lg:self-start">
        <Avatar name={person.title} image={person.image} size="lg" />
        <h1 className="mt-6 font-display text-3xl font-bold">{person.title}</h1>
        <p className="mt-1 font-semibold text-brand-600">{person.meta}</p>
        <ContactButtons email={person.email} phone={person.phone} />
      </div>
      <article className="reveal min-w-0 rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft md:p-12">
        <p className="eyebrow">About</p>
        <p className="mt-3 font-display text-2xl text-brand-900">{person.body}</p>
        <div className="mt-6"><RichText text={person.details} /></div>
      </article>
    </section>
  );
}
