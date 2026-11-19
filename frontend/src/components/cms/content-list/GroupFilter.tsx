import Link from "next/link";
import { cn } from "@/utils/cn";

interface GroupFilterProps {
  groups: string[];
  active?: string;
}

/** "All" plus one chip per `parent` group (e.g. gallery albums). */
export function GroupFilter({ groups, active }: GroupFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {[undefined, ...groups].map((group) => (
        <Link
          key={group ?? "all"}
          href={group ? `?group=${group}` : "?"}
          className={cn("rounded-full px-4 py-1.5 text-sm font-semibold shadow-soft", active === group ? "bg-brand-600 text-white" : "bg-white text-gray-600 hover:text-brand-800")}
        >
          {group ?? "All"}
        </Link>
      ))}
    </div>
  );
}
