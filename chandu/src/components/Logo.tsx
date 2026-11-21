import Image from "next/image";
import { withBase } from "@/utils/base";

/** The APPLES logo. Size and fit come from className so the same logo works as background, footer mark, etc. */
export default function Logo({ className = "", alt = "APPLES logo" }: { className?: string; alt?: string }) {
  return <Image src={withBase("/logo-clear.png")} alt={alt} width={1366} height={1152} priority className={className} />;
}
