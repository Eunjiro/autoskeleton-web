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

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
