import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/test-web",
  images: { unoptimized: true },
};

export default nextConfig;
