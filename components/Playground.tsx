"use client";
import { useState } from "react";
import { ArticleSkeleton } from "@gyojiro/autoskeleton-react";

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

export function ArticleSkeletonPlayground() {
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
    <div className="grid lg:grid-cols-[240px_1fr] gap-5">
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

      <div className="space-y-3 min-w-0">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <ArticleSkeleton
            showHeroImage={showHeroImage}
            heroHeight={heroHeight}
            showAuthor={showAuthor}
            bodyLines={bodyLines}
            showHeading={showHeading}
          />
        </div>
        <CodeOutput code={code} />
      </div>
    </div>
  );
}
