import type { NextConfig } from "next";

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" }, // report PDFs are framed by our own pages only
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

// The APPLES site in /chandu is its own Next.js app; this site forwards /chandu/* to it.
const CHANDU_URL = process.env.CHANDU_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Photos are pre-compressed in public/assets; resizing on the free server's small CPU was the slow part.
  images: { unoptimized: true },
  async rewrites() {
    if (!CHANDU_URL) return [];
    return {
      beforeFiles: [
        { source: "/chandu", destination: `${CHANDU_URL}/chandu` },
        { source: "/chandu/:path+", destination: `${CHANDU_URL}/chandu/:path+` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      { source: "/(.*)", headers: security },
      // 5-minute browser cache: images are replaced under the same file names, so a long cache would keep showing old photos.
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=300" }] },
    ];
  },
};

export default nextConfig;
