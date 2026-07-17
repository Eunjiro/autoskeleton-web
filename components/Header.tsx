import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-blue-600">⚡</span>
            <span>AutoSkeleton</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm hover:text-blue-600 transition">Features</Link>
            <Link href="/components" className="text-sm hover:text-blue-600 transition">Components</Link>
            <Link href="/examples" className="text-sm hover:text-blue-600 transition">Examples</Link>
            <Link href="/docs" className="text-sm hover:text-blue-600 transition">Docs</Link>
            <a 
              href="https://www.npmjs.com/package/@gyojiro/autoskeleton-react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-blue-600 transition"
            >
              npm
            </a>
          </nav>

          <button className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
