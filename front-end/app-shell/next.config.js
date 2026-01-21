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
        // Khi gõ localhost:3000/order -> nó sẽ gọi localhost:3002/order/
        source: "/order",
        destination: "http://localhost:3002/order/",
      },
      {
        source: "/order/:path*",
        destination: "http://localhost:3002/order/:path*",
      },
      {
        source: "/@vite/:path*",
        destination: "http://localhost:3002/@vite/:path*",
      },
    ];
  },
};

export default nextConfig;
