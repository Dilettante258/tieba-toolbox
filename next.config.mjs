/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  async rewrites() {
    return [
      {
        source: '/tiebac/:match*',
        destination: 'https://tiebac.baidu.com/:match*',
      },
      {
        source: '/portrait/:match*',
        destination: 'http://tb.himg.baidu.com/sys/portraitn/item/:match*',
      },
      {
        "source": "/forum/:match*",
        "destination": "http://tiebapic.baidu.com/forum/:match*"
      }
    ]
  },
};

export default nextConfig;
