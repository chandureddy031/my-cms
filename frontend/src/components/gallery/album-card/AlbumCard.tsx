import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import type { ContentItem } from "@/types/content";
import { albumHref } from "@/utils/routes";

interface AlbumCardProps {
  activity: ContentItem;
  photos: ContentItem[];
}

/** One programme's album: cover photo, photo count and title. */
export function AlbumCard({ activity, photos }: AlbumCardProps) {
  return (
    <Link href={albumHref(activity.slug!)} className="reveal group relative block h-80 overflow-hidden rounded-[2rem] shadow-lift">
      <Image src={photos[0].image ?? activity.image!} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <span className="pill absolute right-4 top-4 flex items-center gap-1"><Icon name="image" className="h-4 w-4" />{photos.length} photos</span>
      <div className="absolute bottom-0 p-6 text-white">
        <h2 className="font-display text-2xl font-bold">{activity.title}</h2>
        <p className="mt-1 text-sm text-white/85">{activity.body}</p>
      </div>
    </Link>
  );
}
