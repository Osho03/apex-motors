import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Car imagery is served from Unsplash; everything else is local.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Serve next-gen formats with graceful fallback (browser-negotiated).
    formats: ["image/avif", "image/webp"],
    // Allow the quality grades used across the site (hero 85, cards 80).
    qualities: [75, 80, 85],
  },
};

export default nextConfig;
