/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
  setupDevPlatform();
}

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
