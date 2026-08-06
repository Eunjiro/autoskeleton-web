'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Menu, X, Moon, Sun } from 'lucide-react';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const NAV = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Examples', href: '/examples' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Theme bootstrap — read localStorage or OS preference */
  useEffect(() => {
    const syncTheme = () => {
      const stored = localStorage.getItem('as-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = stored === 'dark' || (!stored && prefersDark);
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    };
    syncTheme();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('as-theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm shadow-slate-900/[0.03]'
        : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">

          {/* ── Logo ──────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity" aria-label="AutoSkeleton home">
            <svg width="26" height="26" viewBox="0 0 128 128" fill="none" aria-hidden="true">
              <rect width="128" height="128" rx="22" fill="#18181B" className="dark:fill-zinc-800"/>
              <circle cx="34" cy="34" r="14" fill="#7C3AED"/>
              <rect x="56" y="26" width="52" height="10" rx="5" fill="#E5E7EB"/>
              <rect x="56" y="42" width="36" height="10" rx="5" fill="#52525B"/>
              <rect x="20" y="66" width="88" height="10" rx="5" fill="#E5E7EB"/>
              <rect x="20" y="82" width="72" height="10" rx="5" fill="#52525B"/>
              <rect x="20" y="98" width="54" height="10" rx="5" fill="#E5E7EB"/>
            </svg>
            <span className="text-sm font-semibold tracking-tight leading-none">
              <span className="text-slate-900 dark:text-zinc-100 text-xl">Auto</span>
              <span className="text-slate-400 dark:text-zinc-500 text-xl">Skeleton</span>
            </span>
          </Link>

          {/* ── Center nav ────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="hover-shimmer px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href="https://github.com/Eunjiro/autoskeleton"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-shimmer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub repository"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@gyojiro/autoskeleton-react"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-shimmer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="npm package"
            >
              <ExternalLink size={13} strokeWidth={2} />
              npm
            </a>

            {/* Divider */}
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-0.5" aria-hidden="true" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
            </button>

            {/* Get started CTA */}
            <Link
              href="/docs"
              className="hover-shimmer ml-2 inline-flex items-center px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-5 space-y-1">
          {NAV.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="hover-shimmer block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href="https://github.com/Eunjiro/autoskeleton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

