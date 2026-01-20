/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack to use webpack
  // Module Federation is loaded client-side via script tags
  webpack: (config, { isServer }) => {
    // Ensure client-side only
    if (!isServer) {
      config.externals = config.externals || [];
    }
    return config;
  },
};

export default nextConfig;
