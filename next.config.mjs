/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  distDir: ".next",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverExternalPackages: []
  }
};

export default nextConfig;
