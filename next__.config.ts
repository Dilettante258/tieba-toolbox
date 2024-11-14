import type { NextConfig } from "next";
import localesPlugin from "@react-aria/optimize-locales-plugin";

const nextConfig: NextConfig = {
  webpack: (
    config,
    {isServer}
  ) => {
    if (!isServer) {
      config.plugins.push(localesPlugin.webpack({locales: []}));
    }
    return config
  },
  experimental: {
    turbo: {
      // ...
    },
  },
};

export default nextConfig;
