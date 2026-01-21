/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pos",
        destination: "http://localhost:3002/pos/",
      },
      {
        source: "/pos/:path*",
        destination: "http://localhost:3002/pos/:path*",
      },
    ];
  },
};

export default nextConfig;
