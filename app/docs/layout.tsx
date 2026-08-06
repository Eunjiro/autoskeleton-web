import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Full setup guide, theming, dark mode, accessibility, and API reference for AutoSkeleton — the React skeleton loading component library.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "AutoSkeleton Documentation",
    description:
      "Full setup guide, theming, dark mode, accessibility, and API reference for AutoSkeleton.",
    url: "/docs",
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.autoskeleton.com" },
    { "@type": "ListItem", position: 2, name: "Docs", item: "https://www.autoskeleton.com/docs" },
  ],
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
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
