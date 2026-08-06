import type { MetadataRoute } from "next";

const SITE_URL = "https://autoskeleton-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/docs", "/components", "/examples"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
