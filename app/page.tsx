'use client';

import Header from "@/components/Header";
import Link from "next/link";
import {
  AvatarSkeleton,
  TextSkeleton,
  CardSkeleton,
  SkeletonGroup,
  ButtonSkeleton,
  ImageSkeleton,
} from "@gyojiro/autoskeleton-react";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-gradient-to-b from-blue-50 dark:from-slate-900 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Beautiful Loading Skeletons for React
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              AutoSkeleton is a modern, composable skeleton loading library built with React + TypeScript. Create stunning loading states with primitive and ready-made components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/components"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Explore Components
              </Link>
              <Link
                href="/docs"
                className="px-8 py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-semibold transition"
              >
                View Documentation
              </Link>
            </div>
            <div className="flex justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span>⚡ Lightweight</span>
              <span>•</span>
              <span>🧩 Composable</span>
              <span>•</span>
              <span>🎨 Customizable</span>
            </div>
          </div>

          {/* Live preview strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <SkeletonGroup direction="row" gap={10} align="center">
                <AvatarSkeleton size={36} />
                <TextSkeleton lines={2} lineHeight={12} gap={6} />
              </SkeletonGroup>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <SkeletonGroup gap={8}>
                <ImageSkeleton aspectRatio="16/9" />
                <TextSkeleton lines={2} lineHeight={12} gap={6} />
              </SkeletonGroup>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <SkeletonGroup gap={8}>
                <TextSkeleton lines={3} lineHeight={12} gap={6} />
                <ButtonSkeleton width="100%" height={32} />
              </SkeletonGroup>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-slate-600 dark:text-slate-400">Get started in seconds</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Installation */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">1. Install</h3>
              <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded text-sm text-slate-100 font-mono overflow-x-auto">
                <div>npm install @gyojiro/autoskeleton-react</div>
              </div>
            </div>

            {/* Setup */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">2. Import CSS</h3>
              <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded text-sm text-slate-100 font-mono overflow-x-auto">
                <div>import &quot;@gyojiro/autoskeleton-react/style.css&quot;</div>
              </div>
            </div>
          </div>

          {/* Basic Usage */}
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">3. Use Components</h3>
            <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded text-sm text-slate-100 font-mono overflow-x-auto">
              <div className="text-blue-400">import</div>
              <div>
                {' {'} <span className="text-orange-400">TextSkeleton</span>,{' '}
                <span className="text-orange-400">AvatarSkeleton</span> {'}'} from{' '}
                <span className="text-green-400">&quot;@gyojiro/autoskeleton-react&quot;</span>
              </div>
              <div className="mt-3">
                <span className="text-blue-400">export default function</span> App() {'{'}
              </div>
              <div className="ml-4">
                <span className="text-blue-400">return</span> {'('}
              </div>
              <div className="ml-8">
                &lt;<span className="text-orange-400">TextSkeleton</span> lines=
                <span className="text-green-400">{3}</span> /&gt;
              </div>
              <div className="ml-8">
                &lt;<span className="text-orange-400">AvatarSkeleton</span> size=
                <span className="text-green-400">{60}</span> /&gt;
              </div>
              <div className="ml-4">{')'}</div>
              <div>{'}'}</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AutoSkeleton?</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need for beautiful loading states</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                title: "Beautiful Animations",
                desc: "Wave, pulse, fade animations built-in. Smooth and modern.",
              },
              {
                icon: "🧩",
                title: "Fully Composable",
                desc: "Use primitives to build custom layouts or use ready-made components.",
              },
              {
                icon: "⚡",
                title: "Lightweight",
                desc: "Tree-shakable library. Only load what you use.",
              },
              {
                icon: "🎨",
                title: "Customizable",
                desc: "Global theme provider with local overrides. Full control.",
              },
              {
                icon: "🔷",
                title: "TypeScript First",
                desc: "Full type safety and IDE autocomplete support.",
              },
              {
                icon: "♿",
                title: "Accessible",
                desc: "Semantic HTML and ARIA attributes included.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Component Library */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">24 Components, 3 Layers</h2>
            <p className="text-slate-600 dark:text-slate-400">From primitives to ready-made composite layouts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primitives */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Primitives</span>
                <span className="text-xs text-slate-400">3</span>
              </div>
              <ul className="space-y-2">
                {["Skeleton", "SkeletonGroup", "SkeletonProvider"].map((n) => (
                  <li key={n}>
                    <Link href="/components" className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline">
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Atomic */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Atomic</span>
                <span className="text-xs text-slate-400">4</span>
              </div>
              <ul className="space-y-2">
                {["TextSkeleton", "AvatarSkeleton", "ButtonSkeleton", "ImageSkeleton"].map((n) => (
                  <li key={n}>
                    <Link href="/components" className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline">
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Composites */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">Composites</span>
                <span className="text-xs text-slate-400">17</span>
              </div>
              <ul className="space-y-1.5 columns-2">
                {[
                  "ArticleSkeleton", "CardSkeleton", "ChatMessageSkeleton",
                  "CommentSkeleton", "DashboardSkeleton", "FormSkeleton",
                  "GallerySkeleton", "ListSkeleton", "MediaObjectSkeleton",
                  "NavbarSkeleton", "PricingCardSkeleton", "ProductCardSkeleton",
                  "ProfileSkeleton", "SidebarSkeleton", "StatisticCardSkeleton",
                  "TableSkeleton", "TimelineSkeleton",
                ].map((n) => (
                  <li key={n} className="break-inside-avoid">
                    <Link href="/components" className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline">
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse all components with live previews and props tables →
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-lg p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Amazing Loading States?</h2>
            <p className="mb-8 text-blue-100">Explore all components and start building today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/components"
                className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition"
              >
                View All Components
              </Link>
              <a
                href="https://www.npmjs.com/package/@gyojiro/autoskeleton-react"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600/50 hover:bg-blue-600/70 border border-white/30 text-white rounded-lg font-semibold transition"
              >
                NPM Package
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">AutoSkeleton</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Beautiful loading skeletons for React.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/components" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">Components</Link></li>
                <li><Link href="/examples" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">Examples</Link></li>
                <li><Link href="/docs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">External</h4>
              <ul className="text-sm space-y-2">
                <li><a href="https://www.npmjs.com/package/@gyojiro/autoskeleton-react" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">npm</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              © 2026 AutoSkeleton. MIT License.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}