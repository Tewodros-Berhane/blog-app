import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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