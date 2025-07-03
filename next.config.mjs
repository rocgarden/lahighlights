/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nexts3-bucket.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevent clickjacking
          },
          {
            key: "Content-Security-Policy",
            value: `
                  default-src 'self';
                  connect-src 'self' https://nexts3-bucket.s3.us-east-2.amazonaws.com;
                  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com;
                  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                  font-src 'self' https://fonts.gstatic.com;
                  img-src 'self' data: blob: https://nexts3-bucket.s3.us-east-2.amazonaws.com https://s3.amazonaws.com;
                  frame-ancestors 'none';
                `
              .replace(/\n/g, "")
              .trim(),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
