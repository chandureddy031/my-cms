import { cn } from "@/utils/cn";

const COLUMNS = { 3: "xl:grid-cols-3", 4: "xl:grid-cols-4" };

interface CardGridProps {
  columns?: keyof typeof COLUMNS;
  className?: string;
  children: React.ReactNode;
}

/** 1 column on phones, 2 on tablets, 3 or 4 on desktops. */
export function CardGrid({ columns = 3, className, children }: CardGridProps) {
  return <div className={cn("grid gap-7 sm:grid-cols-2", COLUMNS[columns], className)}>{children}</div>;
}

interface PageCardGridProps {
  empty?: string;
  children: React.ReactNode[];
}

/** Full-width card grid of a page body; a message when there is nothing to list. */
export function PageCardGrid({ empty = "Content coming soon.", children }: PageCardGridProps) {
  if (!children.length) return <p className="px-6 py-16 text-center text-gray-500">{empty}</p>;
  return <CardGrid className="page-x pb-16">{children}</CardGrid>;
}
