import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const homeImages = [
  "/images/hero-poster.jpg",
  "/images/campaigns/everai-trainers.jpg",
  "/images/campaigns/the-essence.jpg",
  "/images/campaigns/predictions.jpg",
  "/images/campaigns/remote-jobs.jpg",
  "/images/campaigns/mentorship.jpg",
  "/images/campaigns/academy.jpg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly" as const,
      images: homeImages,
    },
    {
      path: "/evermore-platform",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      images: ["/images/campaigns/everai-trainers.jpg", "/images/campaigns/academy.jpg"],
    },
    {
      path: "/evermore-app",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      images: ["/images/icon-512.png"],
    },
    {
      path: "/how-to-register",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/sign-up", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/payment", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images
      ? { images: route.images.map((image) => `${siteConfig.url}${image}`) }
      : {}),
  }));
}
