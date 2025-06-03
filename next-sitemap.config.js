/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://norahbird.com", // your production domain
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/api/*",
    "/unauthorized",
    "/signin",
    "/terms",
    "/items/new",
    "/items/[id]/edit",
    "/itineraries/new",
    "/my-posts",
    "/My-Itineraries",
  ],
};
