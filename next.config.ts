import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.98", "192.168.1.98:3000", "192.168.1.174", "192.168.1.174:3000", "localhost:3000"]
};

export default nextConfig;
