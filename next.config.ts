import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ufs.sh", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
