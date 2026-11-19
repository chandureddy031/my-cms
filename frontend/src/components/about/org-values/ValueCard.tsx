import { IconBadge, type IconName } from "@/components/ui";

interface ValueCardProps {
  icon: IconName;
  title: string;
  text: string;
}

export function ValueCard({ icon, title, text }: ValueCardProps) {
  return (
    <div className="reveal tile p-7 lift">
      <IconBadge icon={icon} glow />
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}
