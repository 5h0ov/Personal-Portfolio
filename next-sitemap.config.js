const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shoob.me";
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  transform: (config, path) => ({
    loc: path,
    changefreq: "monthly",
    priority: path === "/" ? 1.0 : 0.8,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
  robotsTxtOptions: {
    policies: isProduction
      ? [
          {
            userAgent: "*",
            allow: "/",
          },
        ]
      : [
          {
            userAgent: "*",
            disallow: ["/"],
          },
        ],
  },
};
