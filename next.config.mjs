// @ts-check
import localesPlugin from "@react-aria/optimize-locales-plugin";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (
    config,{ isServer }
  ) => {
    // if (!isServer) {
    //   config.plugins.push(localesPlugin.webpack({locales: []}));
    // }
    return config
  },
}

export default nextConfig
