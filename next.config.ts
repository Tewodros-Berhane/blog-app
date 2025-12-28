import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        port: "",
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        port: "",
        protocol: "https",
        hostname: "fabulous-tortoise-580.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
