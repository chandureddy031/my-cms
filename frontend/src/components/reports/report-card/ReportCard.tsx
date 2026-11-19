import { ButtonLink, Icon, IconBadge } from "@/components/ui";
import type { ContentItem } from "@/types/content";
import { isPdf } from "@/utils/format";
import { reportHref } from "@/utils/routes";

interface ReportCardProps {
  report: ContentItem;
}

/** One report in the list, with a button to read it when it has a PDF. */
export function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="reveal tile flex flex-col gap-5 p-7 lift sm:flex-row sm:items-center">
      <IconBadge icon="doc" size="lg" glow className="self-start" />
      <div className="flex-1">
        <span className="meta-label">{report.meta}</span>
        <h3 className="font-display text-2xl font-semibold">{report.title}</h3>
        <p className="mt-2 text-gray-600">{report.body}</p>
      </div>
      {isPdf(report.image) && report.slug && (
        <ButtonLink href={reportHref(report.slug)} size="lg" className="shrink-0">
          View report <Icon name="arrow" className="h-4 w-4" />
        </ButtonLink>
      )}
    </article>
  );
}
