/** @type {import('next').NextConfig} */
const nextConfig = {
  // next.config.js
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nexts3-bucket.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
