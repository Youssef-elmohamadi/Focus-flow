import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://focus-flow.somee.com/api/:path*',
      },
    ]
  },
};

export default nextConfig;
