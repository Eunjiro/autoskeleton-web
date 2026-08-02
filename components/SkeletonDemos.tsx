"use client";
import {
  Skeleton,
  SkeletonGroup,
  SkeletonProvider,
  TextSkeleton,
  AvatarSkeleton,
  ButtonSkeleton,
  ImageSkeleton,
  CardSkeleton,
  ChartSkeleton,
  ArticleSkeleton,
  ProfileSkeleton,
  StatisticCardSkeleton,
  MediaObjectSkeleton,
  StoriesBarSkeleton,
  DARK_THEME,
} from "@gyojiro/autoskeleton-react";
import { useState } from "react";

// ─── Preview wrapper ──────────────────────────────────────────────────────────

function Preview({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 ${className}`}>
      {label && (
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">{label}</p>
      )}
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════

// Legacy export name kept for backwards-compat
export function PrimitiveSkeletonDemo() {
  return <SkeletonBasicDemo />;
}

export function SkeletonBasicDemo() {
  return (
    <div className="space-y-4">
      <Preview label="Rectangle">
        <div className="space-y-2">
          <Skeleton width="100%" height={16} />
          <Skeleton width="80%" height={16} />
          <Skeleton width="60%" height={16} />
        </div>
      </Preview>

      <Preview label="Variants">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <Skeleton width={80} height={36} />
            <span className="text-xs text-slate-400">default</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Skeleton width={80} height={36} variant="rounded" />
            <span className="text-xs text-slate-400">rounded</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Skeleton variant="circle" size={48} />
            <span className="text-xs text-slate-400">circle 48</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Skeleton variant="circle" size={64} />
            <span className="text-xs text-slate-400">circle 64</span>
          </div>
        </div>
      </Preview>

      <Preview label="Animations">
        <div className="grid grid-cols-2 gap-3">
          {(["wave", "pulse", "fade", "none"] as const).map((anim) => (
            <div key={anim}>
              <p className="text-xs text-slate-400 mb-1">{anim}</p>
              <Skeleton width="100%" height={36} animation={anim} />
            </div>
          ))}
        </div>
      </Preview>
    </div>
  );
}

export function SkeletonGroupDemo() {
  return (
    <div className="space-y-4">
      <Preview label="Column layout (default)">
        <SkeletonGroup gap={12}>
          <AvatarSkeleton size={40} />
          <TextSkeleton lines={2} />
          <ButtonSkeleton />
        </SkeletonGroup>
      </Preview>

      <Preview label="Row layout + local pulse override">
        <SkeletonGroup direction="row" gap={12} align="center" animation="pulse">
          <AvatarSkeleton size={48} />
          <TextSkeleton lines={2} />
        </SkeletonGroup>
      </Preview>

      <Preview label="animationDirection: alternate">
        <SkeletonGroup animationDirection="alternate" gap={8}>
          <Skeleton width="100%" height={20} />
          <Skeleton width="75%" height={20} />
          <Skeleton width="50%" height={20} />
        </SkeletonGroup>
      </Preview>

      <Preview label='layout="grid" columns={3}'>
        <SkeletonGroup layout="grid" columns={3} gap={12}>
          {([0, 1, 2, 3, 4, 5] as const).map((i) => (
            <Skeleton key={i} height={48} radius="md" />
          ))}
        </SkeletonGroup>
      </Preview>

      <Preview label="Responsive columns: 1 → 3 → 5 as this panel widens (resize the window)">
        <SkeletonGroup layout="grid" columns={{ base: 1, sm: 3, lg: 5 }} gap={12}>
          {([0, 1, 2, 3, 4, 5, 6, 7, 8] as const).map((i) => (
            <Skeleton key={i} height={48} radius="md" />
          ))}
        </SkeletonGroup>
      </Preview>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ATOMIC
// ═══════════════════════════════════════════════════════════════════════════════

export function TextSkeletonDemo() {
  return (
    <div className="space-y-4">
      <Preview label="3 lines (default)">
        <TextSkeleton />
      </Preview>
      <Preview label="5 lines, randomized widths">
        <TextSkeleton lines={5} randomizeWidths />
      </Preview>
      <Preview label="4 lines, lastLineWidth 50%, lineHeight 20">
        <TextSkeleton lines={4} lastLineWidth="50%" lineHeight={20} gap={10} />
      </Preview>
    </div>
  );
}

export function AvatarSkeletonDemo() {
  return (
    <Preview label="Sizes">
      <div className="flex flex-wrap gap-5 items-end">
        {([24, 32, 40, 48, 64, 80] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-1.5">
            <AvatarSkeleton size={size} />
            <span className="text-xs text-slate-400">{size}px</span>
          </div>
        ))}
      </div>
    </Preview>
  );
}

export function ButtonSkeletonDemo() {
  return (
    <Preview label="Sizes">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <ButtonSkeleton width={80} height={32} />
          <span className="text-xs text-slate-400">80 × 32 (sm)</span>
        </div>
        <div className="flex items-center gap-4">
          <ButtonSkeleton width={120} height={40} />
          <span className="text-xs text-slate-400">120 × 40 (default)</span>
        </div>
        <div className="flex items-center gap-4">
          <ButtonSkeleton width={160} height={44} />
          <span className="text-xs text-slate-400">160 × 44 (lg)</span>
        </div>
        <ButtonSkeleton width="100%" height={48} />
        <span className="text-xs text-slate-400">100% width</span>
      </div>
    </Preview>
  );
}

export function ImageSkeletonDemo() {
  return (
    <div className="space-y-4">
      <Preview label="Default (200px height)">
        <ImageSkeleton />
      </Preview>
      <div className="grid grid-cols-3 gap-3">
        <Preview label="16/9">
          <ImageSkeleton aspectRatio="16/9" />
        </Preview>
        <Preview label="4/3">
          <ImageSkeleton aspectRatio="4/3" />
        </Preview>
        <Preview label="1/1">
          <ImageSkeleton aspectRatio="1/1" />
        </Preview>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSITES
// ═══════════════════════════════════════════════════════════════════════════════

export function ArticleSkeletonDemo() {
  return (
    <Preview className="max-w-lg">
      <ArticleSkeleton />
    </Preview>
  );
}

export function CardSkeletonDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview label="Default (column)">
        <CardSkeleton />
      </Preview>
      <Preview label="With avatar">
        <CardSkeleton showAvatar />
      </Preview>
      <Preview label="Row layout">
        <CardSkeleton direction="row" imageHeight={90} imageWidth={100} />
      </Preview>
      <Preview label="No image">
        <CardSkeleton showImage={false} lines={4} />
      </Preview>
      <Preview label="children: extra content appended after the button">
        <CardSkeleton showAvatar>
          <Skeleton width={64} height={22} radius="full" />
        </CardSkeleton>
      </Preview>
    </div>
  );
}

export function ChartSkeletonDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Preview label="Bar">
        <ChartSkeleton type="bar" height={140} />
      </Preview>
      <Preview label="Line">
        <ChartSkeleton type="line" height={140} />
      </Preview>
      <Preview label="Donut">
        <ChartSkeleton type="donut" height={140} />
      </Preview>
    </div>
  );
}

export function ChatMessageSkeletonDemo() {
  const bubbles = [false, true, false, true] as const;
  return (
    <Preview label="4 messages + input">
      <div className="space-y-3">
        {bubbles.map((isRight, i) => (
          <div key={i} className={`flex gap-2 items-end ${isRight ? "justify-end" : "justify-start"}`}>
            {!isRight && <Skeleton variant="circle" size={28} />}
            <Skeleton
              width={isRight ? "52%" : "62%"}
              height={isRight ? 36 : 48}
              radius="lg"
            />
            {isRight && <Skeleton variant="circle" size={28} />}
          </div>
        ))}
        {/* Input */}
        <div className="flex gap-2 items-center pt-2 border-t border-slate-200 dark:border-slate-800">
          <Skeleton height={40} radius="full" style={{ flex: 1 }} />
          <Skeleton size={40} radius="full" />
        </div>
      </div>
    </Preview>
  );
}

export function CommentSkeletonDemo() {
  return (
    <Preview label="3 comments (default)">
      <div className="space-y-4">
        {([0, 1, 2] as const).map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton variant="circle" size={36} />
            <div className="flex-1 space-y-1.5">
              <Skeleton width="38%" height={13} />
              <Skeleton width="100%" height={13} />
              <Skeleton width="72%" height={13} />
            </div>
          </div>
        ))}
      </div>
    </Preview>
  );
}

export function DashboardSkeletonDemo() {
  // Built from primitives to control keys and avoid library key warnings
  return (
    <Preview label="Stats + chart + table">
      {/* 4 stat cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {([0, 1, 2, 3] as const).map((i) => (
          <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-2">
            <SkeletonGroup direction="row" justify="space-between" align="flex-start" gap={4}>
              <Skeleton width="55%" height={12} />
              <Skeleton size={28} radius="sm" />
            </SkeletonGroup>
            <Skeleton width="50%" height={28} />
            <Skeleton width="40%" height={10} />
          </div>
        ))}
      </div>
      {/* Chart placeholder */}
      <Skeleton width="100%" height={180} radius="md" className="mb-4" />
      {/* Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          {([0, 1, 2, 3] as const).map((i) => (
            <Skeleton key={i} height={16} radius="sm" />
          ))}
        </div>
        {([0, 1, 2, 3, 4] as const).map((row) => (
          <div key={row} className="grid grid-cols-4 gap-3">
            {([0, 1, 2, 3] as const).map((col) => (
              <Skeleton key={col} height={14} radius="sm" />
            ))}
          </div>
        ))}
      </div>
    </Preview>
  );
}

export function FormSkeletonDemo() {
  return (
    <Preview label="4 fields + submit button" className="max-w-sm">
      <div className="space-y-4">
        {([0, 1, 2, 3] as const).map((i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton width="32%" height={13} />
            <Skeleton width="100%" height={40} />
          </div>
        ))}
        <ButtonSkeleton width="100%" height={44} />
      </div>
    </Preview>
  );
}

export function GallerySkeletonDemo() {
  return (
    <div className="space-y-4">
      <Preview label="3 columns (default)">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <ImageSkeleton key={i} aspectRatio="1" />
          ))}
        </div>
      </Preview>
      <Preview label="4 columns, 16/9 ratio">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <ImageSkeleton key={i} aspectRatio="16/9" />
          ))}
        </div>
      </Preview>
    </div>
  );
}

export function ListSkeletonDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview label="Default (icon + 1 line)">
        <div className="space-y-3">
          {([0, 1, 2, 3, 4] as const).map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circle" size={36} />
              <Skeleton height={14} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </Preview>
      <Preview label="2 lines + trailing">
        <div className="space-y-3">
          {([0, 1, 2, 3] as const).map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circle" size={36} />
              <div className="flex-1 space-y-1.5">
                <Skeleton width="68%" height={14} />
                <Skeleton width="45%" height={12} />
              </div>
              <Skeleton size={18} radius="sm" />
            </div>
          ))}
        </div>
      </Preview>
    </div>
  );
}

export function MediaObjectSkeletonDemo() {
  return (
    <div className="space-y-4">
      <Preview label="Square media (default)">
        <MediaObjectSkeleton />
      </Preview>
      <Preview label="Circle media, right position">
        <MediaObjectSkeleton mediaShape="circle" mediaPosition="right" lines={3} />
      </Preview>
    </div>
  );
}

export function NavbarSkeletonDemo() {
  return (
    <Preview label="Logo + 4 links + 2 actions">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Skeleton width={100} height={24} radius="sm" />
        {/* Nav links */}
        <div className="flex gap-5 flex-1">
          {([60, 52, 58, 48] as const).map((w, i) => (
            <Skeleton key={i} width={w} height={14} />
          ))}
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center">
          <ButtonSkeleton width={80} height={34} />
          <Skeleton variant="circle" size={34} />
        </div>
      </div>
    </Preview>
  );
}

export function PricingCardSkeletonDemo() {
  const FeatureList = ({ count }: { count: number }) => (
    <div className="space-y-2 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Skeleton variant="circle" size={16} />
          <Skeleton height={13} style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview label="Default">
        <div className="space-y-3">
          <Skeleton width="58%" height={18} />
          <Skeleton width="42%" height={36} />
          <FeatureList count={5} />
          <ButtonSkeleton width="100%" height={44} />
        </div>
      </Preview>
      <Preview label="With badge">
        <div className="space-y-3">
          <Skeleton width="48%" height={20} radius="full" />
          <Skeleton width="58%" height={18} />
          <Skeleton width="42%" height={36} />
          <FeatureList count={6} />
          <ButtonSkeleton width="100%" height={44} />
        </div>
      </Preview>
    </div>
  );
}

export function ProductCardSkeletonDemo() {
  const Card = ({ showRating }: { showRating: boolean }) => (
    <div className="space-y-2.5">
      <ImageSkeleton height={180} radius="none" />
      <TextSkeleton lines={2} lineHeight={18} gap={4} lastLineWidth="55%" />
      {showRating && (
        <SkeletonGroup direction="row" gap={4} align="center">
          {([0, 1, 2, 3, 4] as const).map((i) => (
            <Skeleton key={i} size={14} variant="circle" />
          ))}
          <Skeleton width={40} height={12} />
        </SkeletonGroup>
      )}
      <Skeleton width="45%" height={24} />
      <ButtonSkeleton width="100%" height={40} />
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview label="Default"><Card showRating /></Preview>
      <Preview label="No rating"><Card showRating={false} /></Preview>
    </div>
  );
}

export function ProfileSkeletonDemo() {
  const Card = ({ showStats }: { showStats: boolean }) => (
    <div className="flex flex-col items-center space-y-3">
      <AvatarSkeleton size={showStats ? 80 : 96} />
      <div className="w-full space-y-1.5 flex flex-col items-center">
        <Skeleton width="58%" height={18} />
        <Skeleton width="78%" height={13} />
        {!showStats && <Skeleton width="68%" height={13} />}
      </div>
      {showStats && (
        <div className="flex gap-6">
          {([0, 1, 2] as const).map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton width={36} height={20} />
              <Skeleton width={44} height={11} />
            </div>
          ))}
        </div>
      )}
      <ButtonSkeleton width="100%" height={40} />
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview label="Default"><Card showStats /></Preview>
      <Preview label="Large avatar, no stats"><Card showStats={false} /></Preview>
      <Preview label="Real ProfileSkeleton + children: a verified badge">
        <ProfileSkeleton>
          <Skeleton width={80} height={16} radius="full" />
        </ProfileSkeleton>
      </Preview>
    </div>
  );
}

export function SidebarSkeletonDemo() {
  return (
    <Preview label="Logo + 6 nav items + profile" className="max-w-xs">
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Skeleton size={32} radius="sm" />
          <Skeleton width={80} height={18} />
        </div>
        {/* Nav items */}
        <div className="space-y-1">
          {([0, 1, 2, 3, 4, 5] as const).map((i) => (
            <div key={i} className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
              <Skeleton size={18} radius="sm" />
              <Skeleton width={`${50 + (i % 3) * 12}%`} height={13} />
            </div>
          ))}
        </div>
        {/* User profile */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <AvatarSkeleton size={32} />
          <div className="flex-1 space-y-1">
            <Skeleton width="60%" height={12} />
            <Skeleton width="40%" height={10} />
          </div>
        </div>
      </div>
    </Preview>
  );
}

export function StatisticCardSkeletonDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Preview>
        <StatisticCardSkeleton />
      </Preview>
      <Preview>
        <StatisticCardSkeleton showIcon={false} metricWidth="80%" />
      </Preview>
    </div>
  );
}

export function StoriesBarSkeletonDemo() {
  return (
    <div className="space-y-4">
      <Preview label="Scrolls instead of shrinking to fit — try a narrow window">
        <StoriesBarSkeleton items={10} />
      </Preview>
      <Preview label="No labels, smaller avatars">
        <StoriesBarSkeleton items={12} avatarSize={40} showLabel={false} />
      </Preview>
    </div>
  );
}

export function TableSkeletonDemo() {
  // Built from primitives to avoid library key warnings on internal list rendering
  const COLS = 4;
  const ROWS = 5;
  return (
    <Preview label="4 cols × 5 rows + header">
      <div className="space-y-2.5">
        {/* Header row */}
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {Array.from({ length: COLS }).map((_, c) => (
            <Skeleton key={c} height={20} radius="sm" />
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800" />
        {/* Data rows */}
        {Array.from({ length: ROWS }).map((_, r) => (
          <div key={r} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
            {Array.from({ length: COLS }).map((_, c) => (
              <Skeleton key={c} height={14} radius="sm" />
            ))}
          </div>
        ))}
      </div>
    </Preview>
  );
}

export function TimelineSkeletonDemo() {
  return (
    <Preview label="Timeline entries">
      <div>
        {([0, 1, 2, 3] as const).map((i) => (
          <div key={i} className="flex gap-4 pb-5 last:pb-0">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <Skeleton variant="circle" size={12} />
              {i < 3 && (
                <div className="w-px flex-1 bg-slate-200 dark:bg-slate-800 mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 space-y-1.5 pt-0.5">
              <Skeleton width="65%" height={15} />
              <Skeleton width="100%" height={13} />
              <Skeleton width="82%" height={13} />
              <Skeleton width="30%" height={11} />
            </div>
          </div>
        ))}
      </div>
    </Preview>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEMING
// ═══════════════════════════════════════════════════════════════════════════════

export function ThemeCustomizationDemo() {
  return (
    <div className="space-y-4">
      <Preview label="SkeletonProvider — pulse animation">
        <SkeletonProvider animation="pulse">
          <SkeletonGroup gap={12}>
            <ImageSkeleton height={120} />
            <TextSkeleton lines={3} />
            <ButtonSkeleton />
          </SkeletonGroup>
        </SkeletonProvider>
      </Preview>
      <Preview label="SkeletonProvider — DARK_THEME preset">
        <div className="rounded-lg bg-slate-800 p-4">
          <SkeletonProvider {...DARK_THEME}>
            <SkeletonGroup gap={12}>
              <ImageSkeleton height={120} />
              <TextSkeleton lines={3} />
              <ButtonSkeleton />
            </SkeletonGroup>
          </SkeletonProvider>
        </div>
      </Preview>
    </div>
  );
}

export function DarkThemeToggleDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(false)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
            !dark
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          Light Theme
        </button>
        <button
          onClick={() => setDark(true)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
            dark
              ? "bg-blue-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          Dark Theme
        </button>
      </div>
      <div className={`rounded-xl p-5 ${dark ? "bg-slate-800" : "bg-white border border-slate-200"}`}>
        <SkeletonProvider {...(dark ? DARK_THEME : {})}>
          <SkeletonGroup gap={14}>
            <SkeletonGroup direction="row" gap={12} align="center">
              <AvatarSkeleton size={48} />
              <TextSkeleton lines={2} />
            </SkeletonGroup>
            <ImageSkeleton aspectRatio="16/9" />
            <TextSkeleton lines={3} />
            <ButtonSkeleton width="100%" height={40} />
          </SkeletonGroup>
        </SkeletonProvider>
      </div>
    </div>
  );
}
