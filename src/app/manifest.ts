import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Evermore — Get Paid to Train EverAI",
    short_name: "Evermore",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#071c40",
    theme_color: "#071c40",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
