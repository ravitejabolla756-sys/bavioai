/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bavio.in" }],
        destination: "https://www.bavio.ai/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bavio.in" }],
        destination: "https://www.bavio.ai/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "bavio.ai" }],
        destination: "https://www.bavio.ai/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
