import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "23 real-world AutoSkeleton examples showing how Skeleton, TextSkeleton, and SkeletonGroup compose into profiles, dashboards, product cards, forms, and more.",
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "AutoSkeleton Examples",
    description:
      "23 real-world AutoSkeleton examples showing how the primitives compose into real layouts.",
    url: "/examples",
  },
};

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
