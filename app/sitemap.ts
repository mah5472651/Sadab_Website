import type { MetadataRoute } from "next";

const siteUrl = "https://mah5472651.github.io/Sadab_Website";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
