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

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
