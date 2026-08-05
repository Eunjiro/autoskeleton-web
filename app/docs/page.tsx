"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import {
  Skeleton,
  SkeletonGroup,
  AvatarSkeleton,
  TextSkeleton,
  ImageSkeleton,
} from "@gyojiro/autoskeleton-react";
import { DarkThemeToggleDemo } from "@/components/SkeletonDemos";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      {children}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}

function highlightTsx(raw: string): string {
  const saved: string[] = [];
  const save = (html: string) => { saved.push(html); return `\x00${saved.length - 1}\x00`; };
  let s = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  s = s.replace(/(\{?\/\*[\s\S]*?\*\/\}?)/g,
    m => save(`<span style="color:#6b7280;font-style:italic">${m}</span>`));
  s = s.replace(/(^\/\/[^\n]*)/gm,
    m => save(`<span style="color:#6b7280;font-style:italic">${m}</span>`));
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    m => save(`<span style="color:#4ade80">${m}</span>`));
  s = s.replace(/(?<!\x00)\b(\d+(?:\.\d+)?)(?!\x00)\b/g,
    (_, n) => save(`<span style="color:#fb923c">${n}</span>`));
  s = s.replace(/\b(true|false|null|undefined)\b/g,
    (_, kw) => save(`<span style="color:#fb923c">${kw}</span>`));
  s = s.replace(/\b(import|export|default|from|const|let|var|function|return|if|else|typeof|type|interface|extends|as|async|await)\b/g,
    (_, kw) => save(`<span style="color:#c084fc">${kw}</span>`));
  s = s.replace(/(?<=&lt;\/?)\b([A-Z][A-Za-z0-9]*)\b/g,
    (_, n) => save(`<span style="color:#67e8f9">${n}</span>`));
  s = s.replace(/(?<=&lt;\/?)\b([a-z][a-z0-9]*)\b/g,
    (_, n) => save(`<span style="color:#f97583">${n}</span>`));
  s = s.replace(/\b([a-zA-Z][a-zA-Z0-9]*)(?=\s*=\s*(?:\{|"|\d))/g,
    (_, n) => save(`<span style="color:#93c5fd">${n}</span>`));
  s = s.replace(/(?<=\.)([a-zA-Z][a-zA-Z0-9]*)\b/g,
    (_, n) => save(`<span style="color:#a5b4fc">${n}</span>`));
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => saved[+i]);
  return s;
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="relative rounded-xl bg-slate-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-xs text-slate-500 uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-slate-200 transition px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-200">
        <code dangerouslySetInnerHTML={{ __html: highlightTsx(code) }} />
      </pre>
    </div>
  );
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    tip: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
    warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  };
  return (
    <div className={`border rounded-xl px-4 py-3 text-sm ${styles[type]}`}>{children}</div>
  );
}

// ─── TOC items ────────────────────────────────────────────────────────────────

const TOC = [
  { id: "installation", label: "Installation" },
  { id: "setup", label: "Setup" },
  { id: "quick-start", label: "Quick Start" },
  { id: "real-world-pattern", label: "Real-World Pattern" },
  { id: "theming", label: "Theming" },
  { id: "dark-theme", label: "Dark Theme" },
  { id: "layout", label: "Layout: Flex & Grid" },
  { id: "skeleton-group-overrides", label: "Local Overrides" },
  { id: "accessibility", label: "Accessibility" },
  { id: "api-reference", label: "API Reference" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeId, setActiveId] = useState("installation");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Page header */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Documentation</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Getting started, theming, accessibility, and full API reference.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* TOC sidebar */}
            <aside className="hidden xl:block w-52 shrink-0 py-8 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                On this page
              </p>
              <ul className="space-y-1">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className={`block text-sm py-1 px-2 rounded transition ${
                        activeId === item.id
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 py-10 space-y-16 max-w-3xl">

              {/* ── INSTALLATION ─────────────────────────────────────────── */}
              <Section id="installation" title="Installation">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  AutoSkeleton ships as a single npm package with zero required dependencies (React
                  16.8+ is a peer dep).
                </p>
                <CodeBlock
                  language="bash"
                  code={`npm install @gyojiro/autoskeleton-react
# or
pnpm add @gyojiro/autoskeleton-react
# or
yarn add @gyojiro/autoskeleton-react`}
                />
              </Section>

              {/* ── SETUP ───────────────────────────────────────────────── */}
              <Section id="setup" title="Setup">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Import the bundled stylesheet <strong>once</strong> at the top level of your app.
                  The CSS file contains the keyframe animations and CSS custom properties used
                  internally.
                </p>

                <SubSection title="Next.js App Router">
                  <CodeBlock
                    language="tsx"
                    code={`// app/layout.tsx
import "@gyojiro/autoskeleton-react/style.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
                  />
                </SubSection>

                <SubSection title="Vite / Create React App">
                  <CodeBlock
                    language="tsx"
                    code={`// main.tsx (or index.tsx)
import "@gyojiro/autoskeleton-react/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);`}
                  />
                </SubSection>

                <Callout type="tip">
                  If you use a global theme, optionally wrap your app once in{" "}
                  <Code>SkeletonProvider</Code> — but it is completely optional. Every skeleton
                  works standalone with sensible defaults.
                </Callout>
              </Section>

              {/* ── QUICK START ─────────────────────────────────────────── */}
              <Section id="quick-start" title="Quick Start">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Import any component and drop it where the real content will go. No provider
                  needed.
                </p>

                <CodeBlock
                  code={`import {
  AvatarSkeleton,
  TextSkeleton,
  ButtonSkeleton,
  CardSkeleton,
} from "@gyojiro/autoskeleton-react";

// Inline composition
function UserCardSkeleton() {
  return (
    <div className="flex gap-3 p-4">
      <AvatarSkeleton size={48} />
      <div className="flex-1">
        <TextSkeleton lines={2} />
      </div>
    </div>
  );
}

// Or use a pre-built composite
function LoadingState() {
  return <CardSkeleton />;
}`}
                />

                <SubSection title="Live preview">
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <SkeletonGroup direction="row" gap={12} align="center">
                      <AvatarSkeleton size={48} />
                      <TextSkeleton lines={2} />
                    </SkeletonGroup>
                  </div>
                </SubSection>
              </Section>

              {/* ── REAL-WORLD PATTERN ──────────────────────────────────── */}
              <Section id="real-world-pattern" title="Real-World Pattern">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The key to pixel-perfect skeleton UIs is to share the same container markup in
                  both the loading and loaded states.
                </p>

                <CodeBlock
                  code={`import { useState, useEffect } from "react";
import { AvatarSkeleton, TextSkeleton, ButtonSkeleton } from "@gyojiro/autoskeleton-react";

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  // Shared card shell — used in BOTH branches
  const card = "flex flex-col gap-4 p-6 rounded-xl border bg-white";

  if (!user) {
    return (
      <div className={card}>
        <AvatarSkeleton size={64} />
        <TextSkeleton lines={3} />
        <ButtonSkeleton width="100%" height={40} />
      </div>
    );
  }

  return (
    <div className={card}>
      <img src={user.avatar} className="w-16 h-16 rounded-full" alt={user.name} />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-slate-500">{user.bio}</p>
      </div>
      <button className="w-full h-10 rounded-lg bg-blue-600 text-white">Follow</button>
    </div>
  );
}`}
                />

                <Callout type="info">
                  Match skeleton dimensions to real content: use{" "}
                  <Code>{"<AvatarSkeleton size={64} />"}</Code> when the real avatar is{" "}
                  <Code>w-16 h-16</Code> (64px), <Code>{'lineHeight={28}'}</Code> when the title
                  is 1.75rem, and <Code>{'height={40}'}</Code> for a <Code>h-10</Code> button. See
                  the{" "}
                  <Link href="/examples" className="underline underline-offset-2">
                    Examples
                  </Link>{" "}
                  page for full walkthroughs.
                </Callout>
              </Section>

              {/* ── THEMING ─────────────────────────────────────────────── */}
              <Section id="theming" title="Theming">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  All theme values flow through React Context. Wrap once with{" "}
                  <Code>SkeletonProvider</Code> to configure every skeleton below it, or pass theme
                  props directly to <Code>SkeletonGroup</Code> for local overrides.
                </p>

                <SubSection title="Default theme">
                  <CodeBlock
                    code={`const DEFAULT_THEME = {
  animation: "wave",           // "wave" | "pulse" | "fade" | "none"
  duration: 1.2,               // seconds
  easing: "ease-in-out",       // any CSS timing function
  animationDirection: "normal",// "normal" | "reverse" | "alternate" | "alternate-reverse"
  radius: "md",                // "none" | "sm" | "md" | "lg" | "full" | string
  color: "#E5E7EB",            // base background
  highlight: "#F9FAFB",        // shimmer highlight (wave animation)
};`}
                  />
                </SubSection>

                <SubSection title="SkeletonProvider">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Pass any subset of theme props. Unspecified values fall back to the defaults
                    above.
                  </p>
                  <CodeBlock
                    code={`import { SkeletonProvider } from "@gyojiro/autoskeleton-react";

// Slower pulse instead of wave
<SkeletonProvider animation="pulse" duration={1.8}>
  <App />
</SkeletonProvider>

// Custom brand colors
<SkeletonProvider color="#E0E7FF" highlight="#EEF2FF">
  <App />
</SkeletonProvider>

// Reverse wave direction
<SkeletonProvider animationDirection="reverse">
  <App />
</SkeletonProvider>

// Cubic-bezier easing
<SkeletonProvider easing="cubic-bezier(0.4, 0, 0.2, 1)">
  <App />
</SkeletonProvider>`}
                  />
                </SubSection>

                <SubSection title="Animation types">
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Value</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["wave", "Shimmer sweep from left to right (default)"],
                          ["pulse", "Gentle opacity in / out pulse"],
                          ["fade", "Soft fade in and out"],
                          ["none", "Static placeholder — no animation"],
                        ].map(([val, desc]) => (
                          <tr key={val} className="border-b border-slate-100 dark:border-slate-800/50">
                            <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-300 text-xs">{val}</td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SubSection>

                <SubSection title="animationDirection">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Maps directly to the CSS <Code>animation-direction</Code> property. Useful for
                    creating a &ldquo;back and forth&rdquo; shimmer effect.
                  </p>
                  <CodeBlock
                    code={`// Default — shimmer left to right
<SkeletonProvider animationDirection="normal">…</SkeletonProvider>

// Shimmer right to left
<SkeletonProvider animationDirection="reverse">…</SkeletonProvider>

// Alternating — great for subtle pulse-like waves
<SkeletonProvider animationDirection="alternate">…</SkeletonProvider>
<SkeletonProvider animationDirection="alternate-reverse">…</SkeletonProvider>`}
                  />
                </SubSection>

                <SubSection title="CSS custom properties">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    You can also override theme values at the CSS level using these custom
                    properties. This is useful for dark-mode overrides via a CSS media query.
                  </p>
                  <CodeBlock
                    language="css"
                    code={`/* globals.css */
:root {
  --skeleton-color: #E5E7EB;
  --skeleton-highlight: #F9FAFB;
  --skeleton-duration: 1.2s;
  --skeleton-easing: ease-in-out;
  --skeleton-direction: normal;
}

@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-color: #374151;
    --skeleton-highlight: #4B5563;
  }
}`}
                  />
                </SubSection>
              </Section>

              {/* ── DARK THEME ──────────────────────────────────────────── */}
              <Section id="dark-theme" title="Dark Theme">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The package exports a <Code>DARK_THEME</Code> preset that overrides the two color
                  values to match dark backgrounds.
                </p>

                <CodeBlock
                  code={`import { SkeletonProvider, DARK_THEME } from "@gyojiro/autoskeleton-react";

// DARK_THEME = { color: "#374151", highlight: "#4B5563" }

// Spread into SkeletonProvider
<SkeletonProvider {...DARK_THEME}>
  <ProfileSkeleton />
</SkeletonProvider>

// Conditionally apply based on app theme state
const { isDark } = useTheme();

<SkeletonProvider {...(isDark ? DARK_THEME : {})}>
  <App />
</SkeletonProvider>`}
                />

                <SubSection title="Live dark / light toggle">
                  <DarkThemeToggleDemo />
                </SubSection>
              </Section>

              {/* ── LAYOUT ───────────────────────────────────────────────── */}
              <Section id="layout" title="Layout: Flex & Grid">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <Code>SkeletonGroup</Code> arranges children with flexbox by default. A row next to a
                  fixed-size element (like an avatar) fills the remaining space automatically —
                  no manual <Code>flex: 1</Code> needed.
                </p>

                <CodeBlock
                  code={`import { SkeletonGroup, AvatarSkeleton, TextSkeleton } from "@gyojiro/autoskeleton-react";

<SkeletonGroup direction="row" gap={12} align="center">
  <AvatarSkeleton size={48} />
  <TextSkeleton lines={2} />
</SkeletonGroup>`}
                />

                <SubSection title="Live preview">
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <SkeletonGroup direction="row" gap={12} align="center">
                      <AvatarSkeleton size={48} />
                      <TextSkeleton lines={2} />
                    </SkeletonGroup>
                  </div>
                </SubSection>

                <SubSection title="Grid">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Set <Code>layout=&quot;grid&quot;</Code> for CSS grid instead of flexbox.{" "}
                    <Code>columns</Code> renders <Code>repeat(columns, 1fr)</Code> — that many
                    equal-width tracks — or pass a raw <Code>grid-template-columns</Code> string
                    for full control.
                  </p>
                  <CodeBlock
                    code={`<SkeletonGroup layout="grid" columns={3} gap={16}>
  <Skeleton height={80} radius="md" />
  <Skeleton height={80} radius="md" />
  <Skeleton height={80} radius="md" />
</SkeletonGroup>`}
                  />
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <SkeletonGroup layout="grid" columns={3} gap={16}>
                      <Skeleton height={80} radius="md" />
                      <Skeleton height={80} radius="md" />
                      <Skeleton height={80} radius="md" />
                    </SkeletonGroup>
                  </div>
                </SubSection>

                <SubSection title="Responsive columns & direction">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <Code>columns</Code> and <Code>direction</Code> both accept a{" "}
                    <Code>{"{ base, sm, md, lg, xl }"}</Code> object instead of a constant value,
                    resolved via a CSS container query scoped to the group&apos;s own rendered
                    width — <strong>not the viewport</strong>. A grid nested inside a narrow
                    sidebar or modal responds to that container&apos;s width correctly, the same
                    way it would at the edge of the browser window.
                  </p>
                  <CodeBlock
                    code={`// 1 column by default, 2 from a 480px container width, 3 from 640px
<SkeletonGroup layout="grid" columns={{ base: 1, sm: 2, md: 3 }} gap={16}>
  {items.map((item) => <ProductCardSkeleton key={item.id} />)}
</SkeletonGroup>`}
                  />
                  <Callout type="info">
                    Breakpoints are container-width, in pixels: <Code>sm</Code> = 480,{" "}
                    <Code>md</Code> = 640, <Code>lg</Code> = 800, <Code>xl</Code> = 1024. Resize
                    this browser window to see the grid above respond — it&apos;s reacting to its
                    own container, not the page.
                  </Callout>
                </SubSection>
              </Section>

              {/* ── LOCAL OVERRIDES ─────────────────────────────────────── */}
              <Section id="skeleton-group-overrides" title="Local Overrides with SkeletonGroup">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <Code>SkeletonGroup</Code> doubles as a layout wrapper <em>and</em> a local theme
                  scope. Any theme props passed to it override only its descendants — the rest of
                  the tree is unaffected.
                </p>

                <CodeBlock
                  code={`import { SkeletonGroup, CardSkeleton, TextSkeleton } from "@gyojiro/autoskeleton-react";

// Global provider uses "wave"; this section uses "pulse"
<SkeletonProvider animation="wave">
  <TextSkeleton lines={3} />

  <SkeletonGroup animation="pulse" color="#DBEAFE" highlight="#EFF6FF">
    <CardSkeleton />
    <CardSkeleton />
  </SkeletonGroup>
</SkeletonProvider>`}
                />

                <SubSection title="Live preview">
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                        Outer — wave (default)
                      </p>
                      <TextSkeleton lines={2} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                        SkeletonGroup override — pulse
                      </p>
                      <SkeletonGroup animation="pulse" gap={12}>
                        <ImageSkeleton height={100} />
                        <TextSkeleton lines={2} />
                      </SkeletonGroup>
                    </div>
                  </div>
                </SubSection>
              </Section>

              {/* ── ACCESSIBILITY ───────────────────────────────────────── */}
              <Section id="accessibility" title="Accessibility">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  AutoSkeleton follows WAI-ARIA guidelines for loading indicators.
                </p>

                <SubSection title="aria-label">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    By default every skeleton is <em>decorative</em> (<Code>aria-hidden=&quot;true&quot;</Code>
                    ). Pass an <Code>aria-label</Code> to expose it to screen readers with{" "}
                    <Code>role=&quot;status&quot;</Code>.
                  </p>
                  <CodeBlock
                    code={`// Decorative (default) — hidden from screen readers
<CardSkeleton />

// Announced — screen reader says "Loading product card..."
<CardSkeleton aria-label="Loading product card..." />

// Announce the whole section once instead of each piece
<div role="status" aria-label="Loading user profile...">
  <AvatarSkeleton />
  <TextSkeleton lines={2} />
</div>`}
                  />
                </SubSection>

                <SubSection title="aria-busy">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <Code>SkeletonGroup</Code> renders <Code>aria-busy=&quot;true&quot;</Code> by default
                    when an <Code>aria-label</Code> is provided. Set it to <Code>false</Code> to
                    suppress this.
                  </p>
                  <CodeBlock
                    code={`<SkeletonGroup aria-label="Loading profile..." aria-busy={true}>
  <AvatarSkeleton />
  <TextSkeleton lines={3} />
</SkeletonGroup>`}
                  />
                </SubSection>

                <SubSection title="prefers-reduced-motion">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    The bundled stylesheet automatically disables all CSS animations when the user
                    has requested reduced motion via the OS accessibility setting. No configuration
                    needed — it works out of the box.
                  </p>
                  <CodeBlock
                    language="css"
                    code={`/* Already handled inside @gyojiro/autoskeleton-react/style.css */
@media (prefers-reduced-motion: reduce) {
  [data-skeleton] {
    animation: none;
  }
}`}
                  />
                  <Callout type="tip">
                    You can still use <Code>animation=&quot;none&quot;</Code> programmatically on
                    any skeleton to force a static placeholder regardless of user preference.
                  </Callout>
                </SubSection>

                <SubSection title="Best practices">
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li>
                      Announce the loading region <em>once</em> using a wrapper{" "}
                      <Code>{'<div role="status">'}</Code> rather than on every individual
                      skeleton.
                    </li>
                    <li>
                      Remove or hide the skeleton container (not just swap content) so screen
                      readers are notified the loading state ended.
                    </li>
                    <li>
                      Use <Code>aria-label</Code> text that describes what is loading, not the
                      visual shape (e.g. &ldquo;Loading user profile&rdquo; not &ldquo;skeleton
                      rectangle&rdquo;).
                    </li>
                    <li>
                      Prefer <Code>animation=&quot;pulse&quot;</Code> or{" "}
                      <Code>animation=&quot;none&quot;</Code> for content that will take a long time
                      to load — the wave shimmer can feel distracting after a few seconds.
                    </li>
                  </ul>
                </SubSection>
              </Section>

              {/* ── API REFERENCE ───────────────────────────────────────── */}
              <Section id="api-reference" title="API Reference">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full props for every component are documented on the{" "}
                  <Link href="/components" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">
                    Components
                  </Link>{" "}
                  page with live previews, searchable props tables, and copy-paste code examples.
                </p>

                <SubSection title="Exports">
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Export</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Kind</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Skeleton", "Component", "Core primitive rectangle/circle block"],
                          ["SkeletonGroup", "Component", "Flex layout wrapper + local theme scope"],
                          ["SkeletonProvider", "Component", "Global theme context provider"],
                          ["TextSkeleton", "Component", "Multi-line paragraph placeholder"],
                          ["AvatarSkeleton", "Component", "Circular avatar placeholder"],
                          ["ButtonSkeleton", "Component", "Rounded button placeholder"],
                          ["ImageSkeleton", "Component", "Aspect-ratio-aware image placeholder"],
                          ["ArticleSkeleton", "Component", "Hero + author + body layout"],
                          ["CardSkeleton", "Component", "Versatile card (column or row)"],
                          ["ChartSkeleton", "Component", "Bar, line, or donut chart placeholder"],
                          ["ChatMessageSkeleton", "Component", "Chat bubbles + input area"],
                          ["CommentSkeleton", "Component", "Stacked comment thread"],
                          ["DashboardSkeleton", "Component", "Stats + chart + table layout"],
                          ["FormSkeleton", "Component", "Labeled fields + submit button"],
                          ["GallerySkeleton", "Component", "CSS-grid image gallery"],
                          ["ListSkeleton", "Component", "Icon + text list items"],
                          ["MediaObjectSkeleton", "Component", "Media block beside text"],
                          ["NavbarSkeleton", "Component", "Logo + links + actions bar"],
                          ["PricingCardSkeleton", "Component", "Pricing tier card"],
                          ["ProductCardSkeleton", "Component", "E-commerce product card"],
                          ["ProfileSkeleton", "Component", "Social profile layout"],
                          ["SidebarSkeleton", "Component", "App sidebar navigation"],
                          ["StatisticCardSkeleton", "Component", "KPI / stat card"],
                          ["StoriesBarSkeleton", "Component", "Horizontally-scrolling avatar row"],
                          ["TableSkeleton", "Component", "Tabular data placeholder"],
                          ["TimelineSkeleton", "Component", "Vertical timeline"],
                          ["DARK_THEME", "Constant", "{ color: '#374151', highlight: '#4B5563' }"],
                          ["useSkeleton", "Hook", "Returns the current SkeletonTheme from context"],
                          ["ResponsiveValue<T>", "Type", "T | { base, sm, md, lg, xl } — for SkeletonGroup's columns/direction"],
                          ["SkeletonBreakpoint", "Type", "\"sm\" | \"md\" | \"lg\" | \"xl\""],
                        ].map(([name, kind, desc], i) => (
                          <tr
                            key={name}
                            className={`border-b border-slate-100 dark:border-slate-800/50 ${i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-900/20"}`}
                          >
                            <td className="px-4 py-2.5 font-mono text-blue-700 dark:text-blue-300 text-xs whitespace-nowrap">
                              {name}
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="text-xs rounded-full px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                {kind}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400 text-xs">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SubSection>

                <SubSection title="useSkeleton hook">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Reads the current <Code>SkeletonTheme</Code> from context — useful for building
                    custom skeletons that respect the global theme.
                  </p>
                  <CodeBlock
                    code={`import { useSkeleton } from "@gyojiro/autoskeleton-react";

function MyCustomSkeleton() {
  const theme = useSkeleton();
  // theme.color, theme.animation, theme.duration, etc.
  return (
    <div
      style={{
        width: 200,
        height: 20,
        background: theme.color,
        borderRadius: 4,
      }}
    />
  );
}`}
                  />
                </SubSection>

                <SubSection title="TypeScript types">
                  <CodeBlock
                    code={`import type {
  SkeletonTheme,           // Full theme config interface
  SkeletonAnimation,       // "wave" | "pulse" | "fade" | "none"
  SkeletonAnimationDirection, // "normal" | "reverse" | "alternate" | "alternate-reverse"
  SkeletonRadius,          // "none" | "sm" | "md" | "lg" | "full" | string
  SkeletonVariant,         // "default" | "rounded" | "circle"
} from "@gyojiro/autoskeleton-react";`}
                  />
                </SubSection>
              </Section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
