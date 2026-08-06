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

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.autoskeleton.com" },
    { "@type": "ListItem", position: 2, name: "Examples", item: "https://www.autoskeleton.com/examples" },
  ],
};

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      {children}
    </>
  );
}
