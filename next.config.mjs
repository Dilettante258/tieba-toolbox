// @ts-check
// import localesPlugin from "@react-aria/optimize-locales-plugin";

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
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tiebapic.baidu.com'
      },
      {
        protocol: 'http',
        hostname: 'imgsrc.baidu.com'
      },



    ]
  }
}

export default nextConfig
