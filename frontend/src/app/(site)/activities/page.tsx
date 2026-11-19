import { ActivityCard } from "@/components/activities";
import { PageCardGrid, PageHeader } from "@/components/shared";
import { getSection } from "@/lib/api";

export const metadata = { title: "Activities" };

export default async function ActivitiesPage() {
  const activities = await getSection("activities");
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Activities"
        subtitle="Elder care, education and child rights, mental health, women and child empowerment, livelihoods and natural farming. Open any programme to see exactly what we do and how."
      />
      <PageCardGrid>{activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}</PageCardGrid>
    </>
  );
}
