import Link from "next/link";
import { IconBadge, type IconName } from "@/components/ui";

interface DashboardTileProps {
  href: string;
  icon: IconName;
  title: string;
  note: React.ReactNode;
}

export function DashboardTile({ href, icon, title, note }: DashboardTileProps) {
  return (
    <Link href={href} className="tile group p-7 lift">
      <IconBadge icon={icon} />
      <p className="mt-4 font-display text-xl font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{note}</p>
    </Link>
  );
}
