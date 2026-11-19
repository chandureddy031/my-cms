import { cn } from "@/utils/cn";
import { Icon, type IconName } from "./Icon";

const SIZES = {
  md: { box: "inline-flex p-3", icon: "h-6 w-6" },
  lg: { box: "p-4", icon: "h-7 w-7" },
};

interface IconBadgeProps {
  icon: IconName;
  size?: keyof typeof SIZES;
  glow?: boolean;
  className?: string;
}

/** An icon in a soft green rounded square. */
export function IconBadge({ icon, size = "md", glow, className }: IconBadgeProps) {
  return (
    <span className={cn("rounded-2xl bg-brand-100 text-brand-700", SIZES[size].box, glow && "shadow-glow", className)}>
      <Icon name={icon} className={SIZES[size].icon} />
    </span>
  );
}
