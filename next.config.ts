import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/about-retreat',
        destination: '/experience',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
