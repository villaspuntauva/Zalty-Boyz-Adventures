import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "Zalty Boyz",
    description: business.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf3",
    theme_color: "#17726e",
    icons: [
      {
        src: "/logo.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
