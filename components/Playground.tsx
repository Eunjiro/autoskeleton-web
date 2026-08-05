"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArticleSkeleton } from "@gyojiro/autoskeleton-react";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";

/* ─── Modal ──────────────────────────────────────────────────────────────── */

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
            <span className="text-[10px] font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-1.5 py-0.5 rounded">
              Interactive
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close playground"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

function PlaygroundLauncher({ label, onOpen }: { label: string; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group flex items-center gap-4 w-full text-left p-5 rounded-xl border border-dashed border-violet-300 dark:border-violet-700/50 bg-violet-50/50 dark:bg-violet-950/20 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
        <SlidersHorizontal size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Toggle props, drag sliders, watch it update live — and copy the exact code.
        </p>
      </div>
      <ArrowRight size={16} className="text-violet-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

/* ─── Reusable controls ──────────────────────────────────────────────────── */

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none py-1">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${
          checked ? "bg-violet-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className={disabled ? "py-1 opacity-40 pointer-events-none" : "py-1"}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-xs font-mono text-slate-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-600"
      />
    </div>
  );
}

function ControlPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-1 h-fit">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Controls</p>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />;
}

function CodeOutput({ code }: { code: string }) {
  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
      <div className="px-4 py-2 border-b border-slate-800">
        <span className="text-xs font-mono text-slate-500">Live code — updates as you adjust controls</span>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-300 overflow-x-auto">{code}</pre>
    </div>
  );
}

/* ─── ArticleSkeleton playground ────────────────────────────────────────── */

function ArticleSkeletonPlaygroundContent() {
  const [showHeroImage, setShowHeroImage] = useState(true);
  const [heroHeight, setHeroHeight] = useState(240);
  const [showAuthor, setShowAuthor] = useState(true);
  const [bodyLines, setBodyLines] = useState(6);
  const [showHeading, setShowHeading] = useState(true);

  const code = [
    "<ArticleSkeleton",
    `  ${showHeroImage ? "showHeroImage" : "showHeroImage={false}"}`,
    showHeroImage ? `  heroHeight={${heroHeight}}` : null,
    `  ${showAuthor ? "showAuthor" : "showAuthor={false}"}`,
    `  bodyLines={${bodyLines}}`,
    `  ${showHeading ? "showHeading" : "showHeading={false}"}`,
    "/>",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      <ControlPanel>
        <Toggle label="Hero image" checked={showHeroImage} onChange={setShowHeroImage} />
        <SliderControl
          label="Hero height"
          value={heroHeight}
          min={100}
          max={360}
          step={10}
          onChange={setHeroHeight}
          disabled={!showHeroImage}
        />
        <Divider />
        <Toggle label="Author row" checked={showAuthor} onChange={setShowAuthor} />
        <Divider />
        <Toggle label="Subheading" checked={showHeading} onChange={setShowHeading} />
        <SliderControl label="Body lines" value={bodyLines} min={1} max={10} onChange={setBodyLines} />
      </ControlPanel>

      <div className="space-y-4 min-w-0">
        {/* Capped height + its own scroll — a tall hero/many body lines
            shouldn't be able to push the code panel below the fold. */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 max-h-[420px] overflow-y-auto">
          <ArticleSkeleton
            showHeroImage={showHeroImage}
            heroHeight={heroHeight}
            showAuthor={showAuthor}
            bodyLines={bodyLines}
            showHeading={showHeading}
          />
        </div>
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 pt-1">
          <CodeOutput code={code} />
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeletonPlayground() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PlaygroundLauncher label="Open the interactive playground" onOpen={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title="ArticleSkeleton Playground">
        <ArticleSkeletonPlaygroundContent />
      </Modal>
    </>
  );
}
