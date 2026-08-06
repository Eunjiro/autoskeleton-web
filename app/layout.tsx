import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "@gyojiro/autoskeleton-react/style.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.autoskeleton.com";
const SITE_TITLE = "AutoSkeleton — Beautiful Loading Skeletons for React";
const SITE_DESCRIPTION =
  "26 TypeScript-first skeleton loading components for React that mirror your real UI. Zero config, fully themeable, dark mode built in. Works with Next.js, Vite, and any React 18+ setup.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · AutoSkeleton",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "react", "skeleton", "skeleton loader", "loading skeleton", "shimmer",
    "placeholder", "component-library", "typescript", "nextjs", "vite",
    "loading state", "ui components", "react components", "content loader",
  ],
  authors: [{ name: "Eunjiro", url: "https://github.com/Eunjiro" }],
  creator: "Eunjiro",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "AutoSkeleton",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AutoSkeleton — Beautiful Loading Skeletons for React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AutoSkeleton",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              description: SITE_DESCRIPTION,
              url: SITE_URL,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              programmingLanguage: ["TypeScript", "JavaScript"],
              author: { "@type": "Person", name: "Eunjiro", url: "https://github.com/Eunjiro" },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
