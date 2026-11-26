import type { MetadataRoute } from "next";
import { profile, SEO_DESCRIPTION } from "@/app/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: "Jhun Parol",
    description: SEO_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#0b0b0d",
    theme_color: "#0b0b0d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
