import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Photos are pre-compressed in public/assets; resizing on the free server's small CPU was the slow part.
  images: { unoptimized: true },
  async headers() {
    // ponytail: 1-day browser cache; a replaced image under the same name can take up to a day to show
    return [{ source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] }];
  },
};

export default nextConfig;
