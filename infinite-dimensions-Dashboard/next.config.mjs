/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable features that might cause issues
  reactStrictMode: false,
  // Skip checks during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Simplify image configuration
  images: {
    unoptimized: true,
  },
  // Disable experimental features
  experimental: {},
  // Increase timeout for chunk loading
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000,
    };
    return config;
  },
}

export default nextConfig
