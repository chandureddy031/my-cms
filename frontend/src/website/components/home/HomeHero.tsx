import Image from "next/image";
import Link from "next/link";
import { HERO } from "../../constants/content";
import { websiteRoutes } from "../../routes";

/** Full-width field photo with the headline panel overlapping its lower edge. */
export function HomeHero() {
  return (
    <section>
      <div className="relative h-[26rem] sm:h-[38rem]">
        <Image src={HERO.image} alt="Farmers ploughing with bullocks in Anantapuramu" fill priority sizes="100vw" className="object-cover object-top" />
      </div>
      <div className="soil-x relative -mt-24 sm:-mt-56">
        <div className="max-w-2xl rounded-md bg-soil-paper p-7 shadow-[0_1px_0_var(--color-soil-line)] sm:p-11">
          <h1 className="soil-h1">{HERO.title}</h1>
          <p className="soil-lead mt-5">{HERO.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={websiteRoutes.donate} className="soil-btn">Donate now</Link>
            <Link href={websiteRoutes.activities} className="soil-btn-line">See our work</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
