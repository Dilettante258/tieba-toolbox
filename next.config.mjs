/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  async rewrites() {
    return [
      {
        source: '/portrait/:target',
        destination: 'http://tb.himg.baidu.com/sys/portraitn/item/:target',
      },
      {
        "source": "/forum/:match*",
        "destination": "http://tiebapic.baidu.com/forum/:match*"
      },
    ]
  },
};

export default nextConfig;
