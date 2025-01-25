import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;
