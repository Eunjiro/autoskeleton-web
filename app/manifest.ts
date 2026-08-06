import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutoSkeleton — Beautiful Loading Skeletons for React",
    short_name: "AutoSkeleton",
    description:
      "26 TypeScript-first skeleton loading components for React that mirror your real UI.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
