import type { MetadataRoute } from "next";
import { cmsDashboardHref, homeHref } from "@/utils/routes";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: homeHref(), disallow: cmsDashboardHref() } };
}
