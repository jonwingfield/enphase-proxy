import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/enphase_api/:path*",
        destination: "http://pi4:8200/:path*",
      },
      {
        source: "/influxdb/query",
        destination: "http://pi4:8086/query",
      },
    ];
  },
};

export default nextConfig;
