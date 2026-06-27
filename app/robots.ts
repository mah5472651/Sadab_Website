import type { MetadataRoute } from "next";

const siteUrl = "https://mah5472651.github.io/Sadab_Website";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
