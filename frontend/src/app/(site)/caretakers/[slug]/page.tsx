import { notFound } from "next/navigation";
import { CaretakerProfile, PersonCard } from "@/components/caretakers";
import { BackLinkBar, CardGrid, TitledSection } from "@/components/shared";
import { getBySlug, getSection } from "@/lib/api";
import { caretakersHref } from "@/utils/routes";

interface CaretakerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaretakerPageProps) {
  return { title: (await getBySlug("caretakers", (await params).slug))?.title ?? "Caretaker" };
}

export default async function CaretakerPage({ params }: CaretakerPageProps) {
  const { slug } = await params;
  const [person, everyone] = await Promise.all([getBySlug("caretakers", slug), getSection("caretakers")]);
  if (!person) notFound();
  return (
    <>
      <BackLinkBar href={caretakersHref()} label="All caretakers" />
      <CaretakerProfile person={person} />
      <TitledSection title="Meet the whole team" className="pt-8">
        <CardGrid columns={4}>{everyone.filter((other) => other.slug !== slug).map((other) => <PersonCard key={other.id} person={other} />)}</CardGrid>
      </TitledSection>
    </>
  );
}
