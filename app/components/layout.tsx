import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description:
    "26 ready-to-use AutoSkeleton components — primitives, atomic, and composite skeleton loaders for React, from Avatar and Text to full Dashboard and Chat layouts.",
  alternates: { canonical: "/components" },
  openGraph: {
    title: "AutoSkeleton Components",
    description:
      "26 ready-to-use AutoSkeleton components — primitives, atomic, and composite skeleton loaders for React.",
    url: "/components",
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.autoskeleton.com" },
    { "@type": "ListItem", position: 2, name: "Components", item: "https://www.autoskeleton.com/components" },
  ],
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
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
