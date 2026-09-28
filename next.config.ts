import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** TEMPORARY private presentation: never index, follow or archive. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
