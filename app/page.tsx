'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import {
  Skeleton,
  SkeletonGroup,
  TextSkeleton,
  AvatarSkeleton,
} from '@gyojiro/autoskeleton-react';
import {
  Rocket, Code2, Paintbrush, Layers, LayoutGrid, Package,
  ArrowRight, Copy, Check, Sparkles, Zap, Wand2, GitFork,
  ExternalLink, Terminal, FileCode,
} from 'lucide-react';

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   LIVE DEMO — cycles between skeleton loading and content every few seconds
══════════════════════════════════════════════════════════════════════════════ */

const CYCLE_MS = 4200;
const REVEAL_MS = 1800;

function StatCard({ loaded, label, value, delta }: { loaded: boolean; label: string; value: string; delta: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3.5">
      {!loaded ? (
        <SkeletonGroup gap={6}>
          <TextSkeleton lines={1} lineHeight={10} lastLineWidth="62%" />
          <TextSkeleton lines={1} lineHeight={24} lastLineWidth="48%" />
          <TextSkeleton lines={1} lineHeight={10} lastLineWidth="38%" />
        </SkeletonGroup>
      ) : (
        <>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">{label}</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1 leading-none">{value}</p>
          <p className="text-xs font-medium text-emerald-500 mt-1.5 leading-none">{delta}</p>
        </>
      )}
    </div>
  );
}

function LiveDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    function cycle() {
      setLoaded(false);
      t1 = setTimeout(() => setLoaded(true), REVEAL_MS);
      t2 = setTimeout(cycle, CYCLE_MS);
    }
    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const activity = [
    { init: 'SC', name: 'Sarah Chen', action: 'left a comment', t: '2m ago', c: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' },
    { init: 'MT', name: 'Mike Torres', action: 'pushed 3 commits', t: '8m ago', c: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
    { init: 'JD', name: 'Jana Dvořák', action: 'opened a PR', t: '15m ago', c: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
  ];

  return (
    <div className="relative select-none">
      {/* Ambient glow */}
      <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-violet-200 to-purple-200 dark:from-violet-900/40 dark:to-purple-900/40 rounded-3xl blur-2xl opacity-50" />

      {/* Browser chrome card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-md px-3 py-1 text-center">
              <span className="text-xs text-slate-400 font-mono">dashboard.example.com</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-500 ${
            loaded
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${loaded ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            {loaded ? 'loaded' : 'loading'}
          </div>
        </div>

        {/* App content */}
        <div className="p-5 space-y-3.5 bg-slate-50/50 dark:bg-slate-900/80">

          {/* 3 stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard loaded={loaded} label="Users" value="12,456" delta="+8.2% ↑" />
            <StatCard loaded={loaded} label="Revenue" value="$54.2k" delta="+12.5% ↑" />
            <StatCard loaded={loaded} label="Conversion" value="3.2%" delta="+0.4% ↑" />
          </div>

          {/* Profile card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-start gap-3">
              {!loaded ? (
                <div className="shrink-0"><AvatarSkeleton size={40} /></div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center font-bold text-violet-700 dark:text-violet-300 text-sm shrink-0">AJ</div>
              )}
              <div className="flex-1 min-w-0">
                {!loaded ? (
                  <SkeletonGroup gap={5}>
                    <TextSkeleton lines={1} lineHeight={14} lastLineWidth="52%" />
                    <TextSkeleton lines={1} lineHeight={12} lastLineWidth="36%" />
                  </SkeletonGroup>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">Alex Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-none">Product Manager · San Francisco</p>
                  </>
                )}
              </div>
              {!loaded
                ? <Skeleton width={60} height={28} radius="lg" />
                : <button className="shrink-0 text-xs font-semibold bg-violet-600 text-white px-3 py-1.5 rounded-lg">Follow</button>
              }
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              {!loaded
                ? <TextSkeleton lines={1} lineHeight={13} gap={5} lastLineWidth="72%" />
                : <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Building user-centric products at Acme Inc. Previously at Google and Meta.</p>
              }
            </div>
          </div>

          {/* Activity list */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden">
            {!loaded
              ? ([0, 1, 2] as const).map(i => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <AvatarSkeleton size={28} />
                  <SkeletonGroup gap={4} style={{ flex: 1 }}>
                    <TextSkeleton lines={2} lineHeight={12} lastLineWidth="20%" />
                  </SkeletonGroup>
                </div>
              ))
              : activity.map(a => (
                <div key={a.init} className="flex items-center gap-3 px-4 py-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${a.c}`}>{a.init}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-none truncate">
                      <span className="font-semibold">{a.name}</span>{' '}
                      <span className="text-slate-400">{a.action}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">{a.t}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   COPY BUTTON
══════════════════════════════════════════════════════════════════════════════ */

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    });
  }, [text]);
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-white/5"
      aria-label="Copy to clipboard"
    >
      {ok ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
      <span className="hidden sm:inline">{ok ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════════════════════ */

const FEATURES = [
  { icon: Rocket,     title: 'Zero Configuration',  desc: 'Install and use immediately. No config files, no providers required to get started.',             color: 'bg-orange-50  dark:bg-orange-950/30  text-orange-600  dark:text-orange-400'  },
  { icon: Code2,      title: 'TypeScript First',     desc: 'Fully typed components with intelligent autocomplete and strict type checking out of the box.',   color: 'bg-blue-50    dark:bg-blue-950/30    text-blue-600    dark:text-blue-400'    },
  { icon: Paintbrush, title: 'Fully Customizable',   desc: 'Global theming via SkeletonProvider. Override animation, colors, and radius per instance.',       color: 'bg-violet-50  dark:bg-violet-950/30  text-violet-600  dark:text-violet-400'  },
  { icon: Layers,     title: 'Dark Mode Ready',      desc: 'Built-in dark mode support with sensible defaults that match your design system.',                color: 'bg-slate-100  dark:bg-slate-800      text-slate-700   dark:text-slate-300'   },
  { icon: LayoutGrid, title: '26 Components',        desc: 'From atomic primitives to full composites — every UI loading pattern you need is covered.',      color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' },
  { icon: Package,    title: 'Tree-Shakable',        desc: 'Import only what you use. Your bundler eliminates the rest. Zero unused bytes shipped.',          color: 'bg-purple-50  dark:bg-purple-950/30  text-purple-600  dark:text-purple-400'  },
] as const;

const COMPONENTS = [
  'Skeleton', 'SkeletonGroup', 'SkeletonProvider',
  'TextSkeleton', 'AvatarSkeleton', 'ButtonSkeleton', 'ImageSkeleton',
  'CardSkeleton', 'ArticleSkeleton', 'ProfileSkeleton', 'StatisticCardSkeleton',
  'MediaObjectSkeleton', 'DashboardSkeleton', 'TableSkeleton', 'FormSkeleton',
  'ChatMessageSkeleton', 'CommentSkeleton', 'GallerySkeleton', 'ListSkeleton',
  'NavbarSkeleton', 'PricingCardSkeleton', 'ProductCardSkeleton',
  'SidebarSkeleton', 'TimelineSkeleton', 'ChartSkeleton', 'StoriesBarSkeleton',
] as const;

const INSTALL = 'npm install @gyojiro/autoskeleton-react';

const USAGE = `import { TextSkeleton, AvatarSkeleton } from '@gyojiro/autoskeleton-react';
import '@gyojiro/autoskeleton-react/style.css';

function UserCard({ loading, user }) {
  return (
    <div className="card">
      {loading
        ? <AvatarSkeleton size={48} />
        : <img src={user.avatar} alt={user.name} />}

      {loading
        ? <TextSkeleton lines={2} lastLineWidth="60%" />
        : <p>{user.name}</p>}
    </div>
  );
}`;

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">

        {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-950">
          {/* Subtle gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/30 dark:from-violet-950/25 dark:via-slate-950 dark:to-purple-950/15 pointer-events-none" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20 pointer-events-none" />
          {/* Blur orbs */}
          <div className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-violet-300 dark:bg-violet-700 rounded-full opacity-[0.11] blur-3xl pointer-events-none" />
          <div className="absolute top-16 -right-20 w-[480px] h-[480px] bg-purple-300 dark:bg-purple-800 rounded-full opacity-[0.08] blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pb-28">
            <div className="grid lg:grid-cols-[55fr_45fr] gap-14 xl:gap-20 items-center">

              {/* ── Left ────────────────────────────────────── */}
              <div className="space-y-8 animate-fade-up">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/50 bg-violet-50/80 dark:bg-violet-950/40 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
                    <Sparkles size={12} strokeWidth={2.5} />
                    AutoSkeleton v1.1
                  </div>
                  <div className="w-px h-3.5 bg-violet-200 dark:bg-violet-700" />
                  <span className="text-xs text-violet-500 dark:text-violet-400">Open Source</span>
                </div>

                {/* Heading */}
                <div className="space-y-5">
                  <h1 className="text-5xl sm:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight leading-[1.06] text-slate-900 dark:text-white">
                    Beautiful loading{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400">
                      states for React.
                    </span>
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-[480px] leading-relaxed">
                    26 TypeScript-first skeleton components that mirror your real UI layout.
                    Zero configuration. Fully customizable. Dark mode built in.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link href="/docs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-px active:translate-y-0"
                  >
                    Get Started <ArrowRight size={15} strokeWidth={2.5} />
                  </Link>
                  <Link href="/components"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-200"
                  >
                    View Components
                  </Link>
                  <a href="https://github.com/Eunjiro/autoskeleton" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm font-medium hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-200"
                  >
                    <GithubIcon size={15} /> GitHub
                  </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                  {[
                    { v: '26', l: 'Components' },
                    { v: '100%', l: 'TypeScript' },
                    { v: 'React 18+', l: 'Compatible' },
                    { v: '0', l: 'Dependencies' },
                  ].map(s => (
                    <div key={s.l}>
                      <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{s.v}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-none">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right — demo ─────────────────────────────── */}
              <div className="lg:pl-2">
                <LiveDemo />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14 space-y-3">
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase">Why AutoSkeleton</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Everything you need.<br className="hidden sm:block" />Nothing you don&apos;t.
              </h2>
              <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Built for developer experience without sacrificing flexibility, performance, or accessibility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-violet-300 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-violet-900/20 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 ${f.color}`}>
                    <f.icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ QUICK START ══════════════════════════════════════════════════════ */}
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-start">

              {/* Left */}
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-3">Quick Start</p>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                    Up and running in seconds.
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
                    Install the package, import the CSS once in your root layout, and start replacing loading spinners with beautiful skeletons.
                  </p>
                </div>

                <ol className="space-y-5">
                  {[
                    { text: 'Install the package via npm, yarn, or pnpm', tag: 'Terminal' },
                    { text: 'Import the stylesheet once in your root layout', tag: 'layout.tsx' },
                    { text: 'Replace loading states with skeleton components', tag: 'any component' },
                    { text: 'Optionally configure SkeletonProvider for global theming', tag: 'Optional' },
                  ].map(({ text, tag }, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-violet-200 dark:border-violet-800/60">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{text}</p>
                        <span className="inline-block mt-1.5 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{tag}</span>
                      </div>
                    </li>
                  ))}
                </ol>

                <Link href="/docs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group"
                >
                  Read the full documentation
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Right — code blocks */}
              <div className="space-y-3">
                {/* Install command */}
                <div className="rounded-xl bg-slate-950 dark:bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between pl-4 pr-2 py-2.5 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Terminal size={13} className="text-slate-500" />
                      <span className="text-xs font-mono text-slate-400">Terminal</span>
                    </div>
                    <CopyBtn text={INSTALL} />
                  </div>
                  <div className="px-5 py-4">
                    <code className="text-sm font-mono">
                      <span className="text-slate-500">$ </span>
                      <span className="text-emerald-400">{INSTALL}</span>
                    </code>
                  </div>
                </div>

                {/* Usage */}
                <div className="rounded-xl bg-slate-950 dark:bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between pl-4 pr-2 py-2.5 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileCode size={13} className="text-slate-500" />
                      <span className="text-xs font-mono text-slate-400">UserCard.tsx</span>
                    </div>
                    <CopyBtn text={USAGE} />
                  </div>
                  <pre className="px-5 py-4 text-xs font-mono overflow-x-auto leading-relaxed">
                    {USAGE.split('\n').map((line, i) => {
                      const html = line
                        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        .replace(/^(import|from|function|return|const|export|default)\b/g, '<span class="text-purple-400">$1</span>')
                        .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-amber-300">$1</span>')
                        .replace(/(\b(?:loading|user|className)\b)/g, '<span class="text-sky-300">$1</span>')
                        .replace(/(&lt;\/?(?:AvatarSkeleton|TextSkeleton|img|p|div)[^&]*&gt;)/g, '<span class="text-green-400">$1</span>');
                      return <span key={i} className="block text-slate-300" dangerouslySetInnerHTML={{ __html: html }} />;
                    })}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TWO WAYS TO BUILD ═══════════════════════════════════════════════ */}
        <section className="relative py-24 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-900/5">
            <GitFork size={18} strokeWidth={2} className="text-violet-500 dark:text-violet-400" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14 space-y-3">
              <p className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase">Two Ways to Build</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Ship fast. Or match pixel-for-pixel.
              </h2>
              <p className="text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Every real page is a little different from the demo. AutoSkeleton doesn&apos;t make you choose
                between convenience and control — reach for whichever your design actually needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-violet-300 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
                  <Package size={20} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Drop in a composite</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  19 pre-built composites — <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-violet-600 dark:text-violet-400">ArticleSkeleton</code>,{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-violet-600 dark:text-violet-400">DashboardSkeleton</code>,{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-violet-600 dark:text-violet-400">ChatMessageSkeleton</code>, and
                  more — cover almost every common layout. Import one, pass a few props, ship it. No custom styling required.
                </p>
                <Link href="/components"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  Browse components
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-violet-300 dark:hover:border-violet-700/50 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 bg-fuchsia-50 dark:bg-fuchsia-950/30 text-fuchsia-600 dark:text-fuchsia-400">
                  <Wand2 size={20} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Freestyle with primitives</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  Got a category badge, a tags row, an icon no composite anticipated? Compose{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-fuchsia-600 dark:text-fuchsia-400">Skeleton</code>,{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-fuchsia-600 dark:text-fuchsia-400">TextSkeleton</code>, and{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-fuchsia-600 dark:text-fuchsia-400">SkeletonGroup</code>{' '}
                  by hand until every shape lines up with your real content.
                </p>
                <Link href="/examples"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300 transition-colors"
                >
                  See it composed
                  <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ COMPONENT GALLERY ════════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-3">Components</p>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  26 ready-to-use components.
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl leading-relaxed text-base">
                  From atomic{' '}
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono text-violet-600 dark:text-violet-400">Skeleton</code>
                  {' '}primitives to complex composites — every pattern covered.
                </p>
              </div>
              <Link href="/components"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-px"
              >
                Browse All <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {COMPONENTS.map(name => (
                <Link key={name} href="/components"
                  className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium border border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-150"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-slate-950 to-purple-950/40" />
          <div className="absolute inset-0 bg-grid opacity-[0.15]" />
          <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-violet-700 rounded-full opacity-[0.08] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[600px] h-[600px] bg-purple-700 rounded-full opacity-[0.08] blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 text-xs font-semibold text-violet-300">
              <Zap size={12} strokeWidth={2.5} />
              Ready to ship
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
              Start building beautiful<br />loading states today.
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Join developers who replaced loading spinners with skeleton UIs that feel native to their application.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold transition-all hover:-translate-y-px shadow-lg"
              >
                Get Started <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="https://github.com/Eunjiro/autoskeleton" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white text-sm font-semibold hover:bg-white/5 transition-all hover:-translate-y-px"
              >
                <GithubIcon size={15} /> Star on GitHub
              </a>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono">
                <span className="text-slate-500">$</span>
                <span className="text-emerald-400">{INSTALL}</span>
                <CopyBtn text={INSTALL} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ══════════════════════════════════════════════════════════ */}
        <footer className="bg-slate-950 border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Brand */}
              <div className="sm:col-span-2 space-y-5">
                <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity w-fit">
                  <svg width="22" height="22" viewBox="0 0 128 128" fill="none" aria-hidden="true">
                    <rect width="128" height="128" rx="22" fill="#18181B"/>
                    <circle cx="34" cy="34" r="14" fill="#7C3AED"/>
                    <rect x="56" y="26" width="52" height="10" rx="5" fill="#E5E7EB"/>
                    <rect x="56" y="42" width="36" height="10" rx="5" fill="#52525B"/>
                    <rect x="20" y="66" width="88" height="10" rx="5" fill="#E5E7EB"/>
                    <rect x="20" y="82" width="72" height="10" rx="5" fill="#52525B"/>
                    <rect x="20" y="98" width="54" height="10" rx="5" fill="#E5E7EB"/>
                  </svg>
                  <span className="text-sm font-semibold text-white">AutoSkeleton</span>
                </Link>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  A modern React + TypeScript component library for building beautiful, performant skeleton loading UIs.
                </p>
                <p className="text-xs text-slate-600">MIT License · Open Source</p>
              </div>

              {/* Docs */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-5">Documentation</p>
                <ul className="space-y-3.5">
                  {[
                    { l: 'Getting Started', h: '/docs' },
                    { l: 'API Reference', h: '/docs#api' },
                    { l: 'Theming', h: '/docs#theming' },
                    { l: 'Dark Mode', h: '/docs#dark-theme' },
                    { l: 'Components', h: '/components' },
                    { l: 'Examples', h: '/examples' },
                  ].map(x => (
                    <li key={x.h}>
                      <Link href={x.h} className="text-sm text-slate-400 hover:text-white transition-colors">{x.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-5">Project</p>
                <ul className="space-y-3.5">
                  <li>
                    <a href="https://github.com/Eunjiro/autoskeleton" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                      GitHub <ExternalLink size={11} className="text-slate-600" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.npmjs.com/package/@gyojiro/autoskeleton-react" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                      npm Package <ExternalLink size={11} className="text-slate-600" />
                    </a>
                  </li>
                  {['Changelog', 'Contributing', 'License'].map(l => (
                    <li key={l}><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-600">
                © {new Date().getFullYear()} AutoSkeleton. Released under the MIT License.
              </p>
              <p className="text-xs text-slate-600">
                Built with{' '}
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 transition-colors">Next.js</a>
                {' '}and{' '}
                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 transition-colors">Tailwind CSS</a>
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
