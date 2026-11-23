import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/ — served as-is by Cloudflare Pages
  output: "export",
  devIndicators: false,
};

export default nextConfig;
