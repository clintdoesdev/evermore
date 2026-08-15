import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    {
      path: "/how-to-register",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/sign-up", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/payment", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/login", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
