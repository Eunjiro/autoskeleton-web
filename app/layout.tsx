import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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

export const metadata: Metadata = {
  title: "AutoSkeleton - Beautiful Loading Skeletons for React",
  description: "A modern, composable skeleton loading library built with React + TypeScript. Create beautiful loading states with primitive and ready-made components.",
  keywords: ["react", "skeleton", "loading", "placeholder", "component-library", "typescript"],
  openGraph: {
    title: "AutoSkeleton - Beautiful Loading Skeletons for React",
    description: "Modern, composable skeleton components for React",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
