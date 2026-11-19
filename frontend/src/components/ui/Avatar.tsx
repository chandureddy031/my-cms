import Image from "next/image";
import { cn } from "@/utils/cn";
import { initialsOf } from "@/utils/format";

const SIZES = {
  sm: "h-16 w-16 text-xl",
  md: "h-24 w-24 text-3xl",
  lg: "h-40 w-40 text-5xl",
};

interface AvatarProps {
  name: string;
  image?: string | null;
  size?: keyof typeof SIZES;
}

/** Round photo, or the person's initials when there is none. */
export function Avatar({ name, image, size = "md" }: AvatarProps) {
  if (image)
    return (
      <div className={cn("relative shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-glow", SIZES[size])}>
        <Image src={image} alt={name} fill sizes="200px" className="object-cover" />
      </div>
    );
  return (
    <div aria-hidden className={cn("flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display font-bold text-white ring-4 ring-white shadow-glow", SIZES[size])}>
      {initialsOf(name)}
    </div>
  );
}
