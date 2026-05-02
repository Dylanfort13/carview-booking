import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/carview-booking",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
