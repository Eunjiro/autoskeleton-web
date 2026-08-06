import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Skeleton, SkeletonGroup } from "@gyojiro/autoskeleton-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-slate-950 px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex mb-8 opacity-70">
            <SkeletonGroup gap={8}>
              <Skeleton width={220} height={16} />
              <Skeleton width={160} height={16} />
              <Skeleton width={190} height={16} />
            </SkeletonGroup>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            This page never loaded.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Not even a skeleton for it — the page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="hover-shimmer inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/docs"
              className="hover-shimmer inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              Docs
            </Link>
            <Link
              href="/components"
              className="hover-shimmer inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              Components
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
