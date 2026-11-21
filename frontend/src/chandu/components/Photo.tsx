import Image from "next/image";
import { withBase } from "@/chandu/utils/base";

/** A photo cropped to fill its box. Give the box size/aspect via className. */
export default function Photo({ src, alt = "", className = "", sizes = "33vw" }: { src: string; alt?: string; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}>
      <Image src={withBase(src)} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
