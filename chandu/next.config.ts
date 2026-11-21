import type { NextConfig } from "next";
import { BASE_PATH } from "./src/utils/base";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Visitors reach this app through the main site (chandutechstack.me/chandu), which forwards the request here.
    serverActions: { allowedOrigins: ["chandutechstack.me", "www.chandutechstack.me", "localhost:3000"] },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
