'use client';
import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import { Copy, Check } from 'lucide-react';
import {
  Skeleton,
  SkeletonGroup,
  TextSkeleton,
  AvatarSkeleton,
  ButtonSkeleton,
  ImageSkeleton,
} from '@gyojiro/autoskeleton-react';

/* ─── Shared constants ─────────────────────────────────────────────────────── */

const CARD = 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden';
const ROW_DIV = 'divide-y divide-slate-100 dark:divide-slate-800';

/* ─── Syntax highlighter ────────────────────────────────────────────────────── */

function highlightTsx(raw: string): string {
  const saved: string[] = [];
  const save = (html: string) => { saved.push(html); return `\x00${saved.length - 1}\x00`; };
  let s = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Save strings, comments, and every highlighted token into slots so that
  // later regex passes never accidentally match inside an already-emitted <span>.
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
  // HTML native element tag names (div, p, h1–h6, span, img, button, ul, li, a…)
  s = s.replace(/(?<=&lt;\/?)\b([a-z][a-z0-9]*)\b/g,
    (_, n) => save(`<span style="color:#f97583">${n}</span>`));
  // JSX/HTML attribute names (word before =value)
  s = s.replace(/\b([a-zA-Z][a-zA-Z0-9]*)(?=\s*=\s*(?:\{|"|\d))/g,
    (_, n) => save(`<span style="color:#93c5fd">${n}</span>`));
  // Object property access (.propName) — colours user.name, user.role, etc.
  s = s.replace(/(?<=\.)([a-zA-Z][a-zA-Z0-9]*)\b/g,
    (_, n) => save(`<span style="color:#a5b4fc">${n}</span>`));
  // Restore all saved tokens
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => saved[+i]);
  return s;
}

/* ─── Code snippets ─────────────────────────────────────────────────────────── */

const CODE_USER_PROFILE = `import {
  AvatarSkeleton, SkeletonGroup, TextSkeleton, ButtonSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <div className="flex items-start gap-4 p-5">
    <AvatarSkeleton size={64} />
    <div style={{ flex: 1 }}>
      <SkeletonGroup gap={5}>
        <TextSkeleton lines={3} lineHeight={20} lastLineWidth="55%" randomizeWidths />
      </SkeletonGroup>
    </div>
  </div>

  <div className="px-5 pb-4">
    <TextSkeleton lines={2} lineHeight={20} gap={5} lastLineWidth="80%" />
  </div>

  {/* Stats row */}
  <div className="flex gap-6 px-5 py-3 border-t">
    {[0, 1, 2].map(i => (
      <SkeletonGroup key={i} gap={4}>
        <TextSkeleton lines={1} lineHeight={22} lastLineWidth={40} />
        <TextSkeleton lines={1} lineHeight={13} lastLineWidth={52} />
      </SkeletonGroup>
    ))}
  </div>

  <div className="flex gap-2.5 px-5 py-4 border-t">
    <div style={{ flex: 1 }}><ButtonSkeleton width="100%" height={38} /></div>
    <ButtonSkeleton width={38} height={38} />
  </div>
</div>`;

const CODE_SOCIAL_POST = `import {
  AvatarSkeleton, TextSkeleton, ImageSkeleton,
  SkeletonGroup, Skeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-4 space-y-3">
  {/* Author row */}
  <div className="flex items-center gap-3">
    <AvatarSkeleton size={40} />
    <div style={{ flex: 1 }}>
      <SkeletonGroup gap={4}>
        <TextSkeleton lines={1} lineHeight={16} lastLineWidth="42%" />
        <TextSkeleton lines={1} lineHeight={12} lastLineWidth="24%" />
      </SkeletonGroup>
    </div>
    {/* size only applies to variant="circle" — width/height for every other variant */}
    <Skeleton width={18} height={18} radius="sm" />
  </div>

  {/* Body text */}
  <TextSkeleton lines={2} lineHeight={20} gap={5} lastLineWidth="60%" />

  {/* Post image */}
  <ImageSkeleton aspectRatio="16/9" />

  {/* Reactions — raw Skeleton, not TextSkeleton: a row of TextSkeletons
      always claims equal-width boxes, which doesn't fit 3 short counters */}
  <div className="flex items-center gap-5 pt-1">
    <SkeletonGroup direction="row" gap={20}>
      {[0, 1, 2].map(i => <Skeleton key={i} width={40} height={14} />)}
    </SkeletonGroup>
  </div>
</div>`;

const CODE_NOTIFICATION_LIST = `import {
  Skeleton, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <div className="flex items-center justify-between px-4 py-3 border-b">
    <TextSkeleton lines={1} lineHeight={16} lastLineWidth={100} />
    <TextSkeleton lines={1} lineHeight={13} lastLineWidth={70} />
  </div>

  {[0, 1, 2, 3].map(i => (
    <div key={i} className="flex items-start gap-3 px-4 py-3">
      <Skeleton width={32} height={32} radius="full" />
      <div className="flex-1 space-y-1.5">
        <TextSkeleton lines={1} lineHeight={15} lastLineWidth="75%" />
        <TextSkeleton lines={1} lineHeight={12} lastLineWidth="22%" />
      </div>
    </div>
  ))}
</div>`;

const CODE_COMMENT_THREAD = `import {
  AvatarSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <div className="px-4 py-3 border-b">
    <TextSkeleton lines={1} lineHeight={20} lastLineWidth={80} />
  </div>

  {[0, 1, 2].map(i => (
    <div key={i} className="flex gap-3 px-4 py-4">
      <AvatarSkeleton size={34} />
      <div className="flex-1 space-y-2">
        {/* Raw Skeleton, not TextSkeleton — a row of TextSkeletons always
            claims equal-width boxes, which doesn't fit a name next to a
            much shorter timestamp */}
        <SkeletonGroup direction="row" gap={12}>
          <Skeleton width={72} height={20} />
          <Skeleton width={64} height={14} />
        </SkeletonGroup>
        <TextSkeleton lines={1} lineHeight={18} gap={4} lastLineWidth="85%" />
        <SkeletonGroup direction="row" gap={12}>
          <Skeleton width={36} height={12} />
          <Skeleton width={40} height={12} />
        </SkeletonGroup>
      </div>
    </div>
  ))}
</div>`;

const CODE_BLOG_ARTICLE = `import {
  AvatarSkeleton, ImageSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <ImageSkeleton aspectRatio="16/9" radius="none" />

  <div className="p-4 space-y-3">
    {/* Category badge */}
    <TextSkeleton lines={1} lineHeight={22} lastLineWidth={110} />

    {/* Title */}
    <TextSkeleton lines={1} lineHeight={24} gap={5} lastLineWidth="70%" />

    {/* Author row */}
    <SkeletonGroup direction="row" gap={10} align="center">
      <AvatarSkeleton size={28} />
      <SkeletonGroup gap={4}>
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} />
        <TextSkeleton lines={1} lineHeight={12} lastLineWidth={130} />
      </SkeletonGroup>
    </SkeletonGroup>

    {/* Tags — raw Skeleton, not TextSkeleton, for the same equal-width-box reason */}
    <SkeletonGroup direction="row" gap={6}>
      {[44, 84, 56].map(w => <Skeleton key={w} width={w} height={22} radius="sm" />)}
    </SkeletonGroup>

    {/* Excerpt */}
    <TextSkeleton lines={3} lineHeight={16} gap={5} lastLineWidth="82%" />
  </div>
</div>`;

const CODE_VIDEO_CARD = `import {
  AvatarSkeleton, ImageSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  {/* Thumbnail + duration badge */}
  <div className="relative">
    <ImageSkeleton aspectRatio="16/9" radius="none" />
    <div className="absolute bottom-2 right-2">
      <Skeleton width={40} height={20} radius="sm" />
    </div>
  </div>

  {/* Channel avatar + title + meta */}
  <div className="p-3 flex gap-3">
    <AvatarSkeleton size={32} />
    <div style={{ flex: 1 }}>
      <TextSkeleton lines={1} lineHeight={18} gap={4} lastLineWidth="62%" />
      <div className="mt-1.5">
        {/* channel name + views, each an independently randomized single line */}
        <SkeletonGroup gap={3}>
          <TextSkeleton lines={1} lineHeight={13} randomizeWidths maxLineWidth={15} />
          <TextSkeleton lines={1} lineHeight={13} randomizeWidths maxLineWidth={20} />
        </SkeletonGroup>
      </div>
    </div>
  </div>
</div>`;

const CODE_PRODUCT_CARD = `import {
  ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <div className="relative">
    <ImageSkeleton aspectRatio="3/4" radius="none" />
    <div className="absolute top-2.5 left-2.5">
      <Skeleton width={72} height={20} radius="full" />
    </div>
  </div>

  <div className="p-4 space-y-2">
    <TextSkeleton lines={2} lineHeight={20} gap={4} lastLineWidth="62%" />
    <TextSkeleton lines={1} lineHeight={16} lastLineWidth={120} />
    <SkeletonGroup direction="row" gap={8} align="baseline">
      <TextSkeleton lines={1} lineHeight={28} lastLineWidth={80} />
      <TextSkeleton lines={1} lineHeight={16} lastLineWidth={55} />
    </SkeletonGroup>
    <ButtonSkeleton width="100%" height={40} />
  </div>
</div>`;

const CODE_PRICING_CARD = `import {
  ButtonSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-6 space-y-5">
  <div className="flex items-center justify-between">
    <TextSkeleton lines={1} lineHeight={16} lastLineWidth="38%" />
    <Skeleton width={80} height={22} radius="full" />
  </div>

  <div className="flex items-baseline gap-1">
    <TextSkeleton lines={1} lineHeight={48} lastLineWidth={80} />
    <TextSkeleton lines={1} lineHeight={16} lastLineWidth={56} className="ml-1" />
  </div>

  <TextSkeleton lines={1} lineHeight={16} lastLineWidth="65%" />

  {/* Feature list — real SkeletonGroup, not a raw div, so the percentage-width
      label has an ambient row layout context to resolve against */}
  <div className="space-y-2.5">
    {[0, 1, 2, 3, 4].map(i => (
      <SkeletonGroup key={i} direction="row" gap={10} align="center">
        <Skeleton size={16} variant="circle" />
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth={\`\${55 + (i % 3) * 10}%\`} />
      </SkeletonGroup>
    ))}
  </div>

  <ButtonSkeleton width="100%" height={44} />
</div>`;

const CODE_PRODUCT_DETAIL = `import {
  ButtonSkeleton, ImageSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-6">
  <div className="grid md:grid-cols-2 gap-8">
    <ImageSkeleton aspectRatio="1" radius="lg" />

    <div className="space-y-4">
      <TextSkeleton lines={1} lineHeight={14} lastLineWidth="48%" />
      <TextSkeleton lines={2} lineHeight={28} gap={5} lastLineWidth="82%" />
      <TextSkeleton lines={1} lineHeight={16} lastLineWidth="48%" />

      {/* Price row — sale price, strikethrough, and discount badge each need
          their own line height, so this is three explicit TextSkeletons */}
      <SkeletonGroup direction="row" gap={10} align="baseline">
        <TextSkeleton lines={1} lineHeight={36} lastLineWidth={90} />
        <TextSkeleton lines={1} lineHeight={18} lastLineWidth={65} />
        <TextSkeleton lines={1} lineHeight={16} lastLineWidth={55} />
      </SkeletonGroup>

      <TextSkeleton lines={3} lineHeight={20} gap={5} lastLineWidth="72%" />

      {/* Size selector */}
      <div>
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth="22%" className="mb-2" />
        <div className="flex gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map(s => (
            <Skeleton key={s} width={36} height={36} radius="md" />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div style={{ flex: 1 }}><ButtonSkeleton width="100%" height={44} /></div>
        <ButtonSkeleton width={44} height={44} />
      </div>
    </div>
  </div>
</div>`;

const CODE_ANALYTICS_DASHBOARD = `import {
  AvatarSkeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="space-y-4">
  {/* Stat cards */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {[0, 1, 2, 3].map(i => (
      <div key={i} className="card p-4">
        <SkeletonGroup gap={6}>
          <TextSkeleton lines={1} lineHeight={14} lastLineWidth="65%" />
          <TextSkeleton lines={1} lineHeight={36} lastLineWidth="55%" />
          <TextSkeleton lines={1} lineHeight={14} lastLineWidth="42%" />
        </SkeletonGroup>
      </div>
    ))}
  </div>

  {/* Activity feed */}
  <div className="card">
    <div className="px-4 py-3 border-b">
      <TextSkeleton lines={1} lineHeight={18} lastLineWidth={130} />
    </div>
    {[0, 1, 2, 3].map(i => (
      <div key={i} className="flex items-center gap-3 px-4 py-3">
        <AvatarSkeleton size={36} />
        <SkeletonGroup gap={5} style={{ flex: 1 }}>
          <TextSkeleton lines={1} lineHeight={16} lastLineWidth="68%" />
          <TextSkeleton lines={1} lineHeight={13} lastLineWidth="24%" />
        </SkeletonGroup>
      </div>
    ))}
  </div>
</div>`;

const CODE_DATA_TABLE = `import {
  AvatarSkeleton, Skeleton, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

const COLUMNS = ['Name', 'Email', 'Role', 'Status', 'Joined'];

// Rendered while loading
<table className="w-full text-sm">
  <thead>
    <tr>
      {COLUMNS.map(col => (
        <th key={col} className="px-4 py-3 text-left">
          <Skeleton height={13} width="70%" />
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {[0, 1, 2, 3, 4].map(ri => (
      <tr key={ri}>
        {COLUMNS.map((col, ci) => (
          <td key={col} className="px-4 py-3">
            {ci === 0 ? (
              <div className="flex items-center gap-2.5">
                <AvatarSkeleton size={28} />
                <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} />
              </div>
            ) : (
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth={\`\${50 + (ci * 10) % 30}%\`} />
            )}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>`;

const CODE_LOGIN_FORM = `import {
  ButtonSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-6 space-y-5">
  <div className="text-center">
    <SkeletonGroup gap={6} align="center">
      <Skeleton width={160} height={26} className="mx-auto" />
      <Skeleton width={210} height={14} className="mx-auto" />
    </SkeletonGroup>
  </div>

  {[{ label: 'Email', w: 46 }, { label: 'Password', w: 64 }].map(field => (
    <div key={field.label} className="space-y-1.5">
      <Skeleton width={field.w} height={13} />
      <Skeleton width="100%" height={40} />
    </div>
  ))}

  <div className="flex items-center justify-between">
    <TextSkeleton lines={1} lineHeight={14} lastLineWidth={110} />
    <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} />
  </div>

  <ButtonSkeleton width="100%" height={44} />

  <div className="text-center">
    <Skeleton width={180} height={13} className="mx-auto" />
  </div>
</div>`;

const CODE_CHAT = `import {
  AvatarSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

const messages = [
  { isMe: false, h: 36 },
  { isMe: true, h: 52 },
  { isMe: false, h: 36 },
  { isMe: true, h: 36 },
];

// Rendered while loading
<div className="card">
  <div className="flex items-center gap-3 px-4 py-3 border-b">
    <AvatarSkeleton size={32} />
    <div style={{ flex: 1 }}>
      <SkeletonGroup gap={3}>
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth={80} />
        <TextSkeleton lines={1} lineHeight={12} lastLineWidth={45} />
      </SkeletonGroup>
    </div>
  </div>

  <div className="p-4 space-y-3">
    {messages.map((m, i) => (
      <div key={i} className={\`flex gap-2 items-end \${m.isMe ? 'justify-end' : 'justify-start'}\`}>
        {!m.isMe && <Skeleton variant="circle" size={24} />}
        <Skeleton width={m.isMe ? '52%' : '60%'} height={m.h} radius="lg" />
      </div>
    ))}
  </div>

  <div className="px-4 pb-4 flex gap-2">
    <div style={{ flex: 1 }}><Skeleton width="100%" height={38} radius="full" /></div>
    <Skeleton width={38} height={38} radius="full" />
  </div>
</div>`;

const CODE_SETTINGS_PANEL = `import {
  Skeleton, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card">
  <div className="px-5 py-3 border-b">
    <TextSkeleton lines={1} lineHeight={18} lastLineWidth={120} />
  </div>

  {[0, 1, 2, 3].map(i => (
    <div key={i} className="flex items-center justify-between px-5 py-4 gap-4">
      <div className="flex-1 space-y-1.5">
        <TextSkeleton lines={1} lineHeight={15} lastLineWidth="55%" />
        <TextSkeleton lines={1} lineHeight={13} lastLineWidth="75%" />
      </div>
      <Skeleton width={44} height={24} radius="full" />
    </div>
  ))}
</div>`;

const CODE_SIDEBAR_NAV = `import {
  AvatarSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-4 space-y-4">
  <div className="flex items-center gap-2.5 pb-3 border-b">
    <Skeleton width={32} height={32} radius="sm" />
    <TextSkeleton lines={1} lineHeight={18} lastLineWidth={80} />
  </div>

  {/* Nav items — real SkeletonGroup, not a raw div: TextSkeleton's
      percentage width only resolves inside an ambient row layout context */}
  <div className="space-y-0.5">
    {[0, 1, 2, 3, 4, 5].map(i => (
      <SkeletonGroup key={i} direction="row" gap={10} align="center" className="px-2 py-2 rounded-lg">
        <Skeleton width={18} height={18} radius="sm" />
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth={\`\${45 + (i % 3) * 15}%\`} />
      </SkeletonGroup>
    ))}
  </div>

  <div className="pt-3 border-t flex items-center gap-2.5">
    <AvatarSkeleton size={32} />
    <div style={{ flex: 1 }}>
      <SkeletonGroup gap={3}>
        <TextSkeleton lines={1} lineHeight={13} lastLineWidth="65%" />
        <TextSkeleton lines={1} lineHeight={11} lastLineWidth="45%" />
      </SkeletonGroup>
    </div>
  </div>
</div>`;

const CODE_MUSIC_PLAYER = `import {
  ImageSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="card p-5 space-y-4">
  <div className="flex items-center gap-4">
    <ImageSkeleton aspectRatio="1" width={72} radius="lg" style={{ flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <SkeletonGroup gap={5}>
        <TextSkeleton lines={1} lineHeight={18} lastLineWidth="72%" />
        <TextSkeleton lines={1} lineHeight={14} lastLineWidth="50%" />
      </SkeletonGroup>
    </div>
    <Skeleton width={20} height={20} radius="full" />
  </div>

  {/* Progress bar */}
  <div className="space-y-1">
    <Skeleton width="100%" height={4} radius="full" />
    <div className="flex justify-between">
      <TextSkeleton lines={1} lineHeight={12} lastLineWidth={28} />
      <TextSkeleton lines={1} lineHeight={12} lastLineWidth={28} />
    </div>
  </div>

  {/* Playback controls */}
  <div className="flex items-center justify-center gap-6">
    <SkeletonGroup direction="row" gap={24} align="center">
      {[0, 1, 2, 3, 4].map(i => (
        <Skeleton key={i} size={i === 2 ? 40 : 22} variant="circle" />
      ))}
    </SkeletonGroup>
  </div>
</div>`;

const CODE_NAVBAR = `import {
  AvatarSkeleton, ButtonSkeleton, Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

const links = ['Features', 'Pricing', 'Docs', 'Blog'];

// Rendered while loading
<div className="card px-5 py-3 flex items-center gap-6">
  <SkeletonGroup direction="row" gap={8} align="center">
    <Skeleton width={28} height={28} radius="sm" />
    <TextSkeleton lines={1} lineHeight={18} lastLineWidth={100} />
  </SkeletonGroup>

  <div className="hidden sm:flex flex-1 items-center gap-5">
    {links.map(link => (
      <TextSkeleton key={link} lines={1} lineHeight={14} lastLineWidth={52} />
    ))}
  </div>

  <div className="flex items-center gap-2 ml-auto sm:ml-0">
    <Skeleton width={32} height={32} radius="full" />
    <ButtonSkeleton width={88} height={34} />
    <AvatarSkeleton size={32} />
  </div>
</div>`;

const CODE_SEARCH_RESULTS = `import {
  Skeleton, SkeletonGroup, TextSkeleton,
} from '@gyojiro/autoskeleton-react';

// Rendered while loading
<div className="space-y-3">
  <div className="card flex items-center gap-3 px-4 h-12">
    <SkeletonGroup direction="row" gap={10} align="center" style={{ flex: 1 }}>
      <Skeleton width={18} height={18} radius="sm" />
      <TextSkeleton lines={1} lineHeight={16} lastLineWidth="40%" />
    </SkeletonGroup>
  </div>

  {[0, 1, 2, 3].map(i => (
    <div key={i} className="card p-4 space-y-1.5">
      <TextSkeleton lines={1} lineHeight={12} lastLineWidth="38%" />
      <TextSkeleton lines={1} lineHeight={20} lastLineWidth="76%" />
      <TextSkeleton lines={2} lineHeight={16} gap={4} lastLineWidth="92%" />
    </div>
  ))}
</div>`;

/* ─── Creative example code snippets ───────────────────────────────────────── */

const CODE_PIANO = `import { Skeleton, SkeletonGroup } from '@gyojiro/autoskeleton-react';

// Skeletons don't have to represent loading UI at all —
// they're just animated, themeable rectangles and circles.
<SkeletonGroup direction="row" gap={2}>
  {keys.map((k) => (
    <Skeleton key={k} width={28} height={120} radius="sm" />
  ))}
</SkeletonGroup>`;

const CODE_EQUALIZER = `import { Skeleton, SkeletonGroup } from '@gyojiro/autoskeleton-react';

<SkeletonGroup direction="row" gap={4} align="flex-end" style={{ height: 80 }}>
  {bars.map((h, i) => (
    <Skeleton
      key={i}
      width={6}
      height={h}
      radius="full"
      animation="pulse"
      style={{ animationDelay: \`\${i * 90}ms\` }}
    />
  ))}
</SkeletonGroup>`;

const CODE_HEATMAP = `import { SkeletonGroup, Skeleton } from '@gyojiro/autoskeleton-react';

<SkeletonGroup layout="grid" columns={26} gap={3}>
  {cells.map((intensity, i) => (
    <Skeleton key={i} width={10} height={10} radius="sm"
      style={{ opacity: 0.15 + intensity * 0.85 }} />
  ))}
</SkeletonGroup>`;

const CODE_QR = `import { SkeletonGroup, Skeleton } from '@gyojiro/autoskeleton-react';

<SkeletonGroup layout="grid" columns={12} gap={2} animation="none">
  {cells.map((filled, i) => (
    <Skeleton key={i} width={10} height={10} radius="none"
      style={{ opacity: filled ? 1 : 0 }} />
  ))}
</SkeletonGroup>`;

const CODE_CONSTELLATION = `import { AvatarSkeleton } from '@gyojiro/autoskeleton-react';

// Absolute-positioned circles of varying size — a starfield, not an avatar
{stars.map((s) => (
  <div key={s.id} style={{ position: 'absolute', left: s.x, top: s.y }}>
    <AvatarSkeleton size={s.size} animation="fade" />
  </div>
))}`;

/* ─── ExampleCard ──────────────────────────────────────────────────────────── */

function ExampleCard({
  title,
  span = 1,
  code,
  children,
}: {
  title: string;
  span?: 1 | 2;
  code?: string;
  children: (loading: boolean) => React.ReactNode;
}) {
  const [view, setView] = useState<'skeleton' | 'content' | 'code'>('skeleton');
  const [copied, setCopied] = useState(false);

  const loading = view === 'skeleton';

  const copyCode = useCallback(() => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const btnBase = 'px-2.5 py-1 text-xs font-medium rounded-md transition-all';
  const btnActive = `${btnBase} bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-slate-100`;
  const btnInactive = `${btnBase} text-slate-400 hover:text-slate-600 dark:hover:text-slate-300`;

  const dotColor = view === 'skeleton'
    ? 'bg-amber-400 animate-pulse'
    : view === 'content'
    ? 'bg-emerald-400'
    : 'bg-violet-400';

  return (
    <div className={span === 2 ? 'md:col-span-2' : ''}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 gap-2 min-h-[28px]">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{title}</p>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="hidden sm:flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full flex-shrink-0 transition-colors ${dotColor}`} />
            <span className="text-xs font-mono text-slate-400">{view}</span>
          </span>
          <div className="flex gap-px p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button onClick={() => setView('skeleton')} className={view === 'skeleton' ? btnActive : btnInactive}>
              Skeleton
            </button>
            <button onClick={() => setView('content')} className={view === 'content' ? btnActive : btnInactive}>
              Content
            </button>
            {code && (
              <button onClick={() => setView('code')} className={view === 'code' ? btnActive : btnInactive}>
                Code
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Code view */}
      {view === 'code' && code ? (
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pl-4 pr-2 py-2.5 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">{title.replace(/ /g, '')}.tsx</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-white/5"
            >
              {copied
                ? <><Check size={12} className="text-emerald-400" /> Copied</>
                : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[480px] overflow-y-auto text-slate-200">
            <code dangerouslySetInnerHTML={{ __html: highlightTsx(code) }} />
          </pre>
        </div>
      ) : (
        children(loading)
      )}
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */

function Sec({ id, title, count, children }: { id?: string; title: string; count: number; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-5 scroll-mt-20">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">{title}</h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{count}</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {children}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 1: Profiles & Social
══════════════════════════════════════════════════════════════════════════════ */

function UserProfile({ l }: { l: boolean }) {
  return (
    <div className={CARD}>
      <div className="flex items-start gap-4 p-5">
        {l ? (
          <div className="flex-shrink-0"><AvatarSkeleton size={64} /></div>
        ) : (
          <div className="w-16 h-16 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-lg">AJ</div>
        )}
        <div className="flex-1 min-w-0 pt-1">
          {l ? (
            <SkeletonGroup gap={5}>
              <TextSkeleton lines={3} lineHeight={20} lastLineWidth="55%" randomizeWidths/>
            </SkeletonGroup>
          ) : (
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">Alex Johnson</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Senior Product Designer</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">alex@example.com</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-4">
        {l ? (
          <TextSkeleton lines={2} lineHeight={20} gap={5} lastLineWidth="80%" />
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Building human-centred products with a focus on accessibility. Based in San Francisco.
          </p>
        )}
      </div>

      <div className="flex gap-6 px-5 py-3 border-t border-slate-100 dark:border-slate-800">
        {l ? (
          <>
            {([0, 1, 2] as const).map(i => (
              <SkeletonGroup key={i} gap={4}>
                <TextSkeleton lines={1} lineHeight={22} lastLineWidth={40} />
                <TextSkeleton lines={1} lineHeight={13} lastLineWidth={52} />
              </SkeletonGroup>
            ))}
          </>
        ) : (
          <>
            {([['1.4k', 'Followers'], ['342', 'Following'], ['89', 'Posts']] as const).map(([v, lbl]) => (
              <div key={lbl}>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">{v}</p>
                <p className="text-xs text-slate-400 mt-1">{lbl}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex gap-2.5 px-5 py-4 border-t border-slate-100 dark:border-slate-800">
        {l ? (
          <>
            <div className="flex-1"><ButtonSkeleton width="100%" height={38} /></div>
            <ButtonSkeleton width={38} height={38} />
          </>
        ) : (
          <>
            <button className="flex-1 h-[38px] rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition">Follow</button>
            <button className="w-[38px] h-[38px] rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition">↗</button>
          </>
        )}
      </div>
    </div>
  );
}

function SocialPost({ l }: { l: boolean }) {
  return (
    <div className={CARD}>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          {l ? (
            <div className="flex-shrink-0"><AvatarSkeleton size={40} /></div>
          ) : (
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-sm">SC</div>
          )}
          <div className="flex-1 min-w-0">
            {l ? (
              <SkeletonGroup gap={4}>
                <TextSkeleton lines={1} lineHeight={16} lastLineWidth="42%" />
                <TextSkeleton lines={1} lineHeight={12} lastLineWidth="24%" />
              </SkeletonGroup>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Sarah Chen</p>
                <p className="text-xs text-slate-400 mt-1 leading-none">2 hours ago</p>
              </>
            )}
          </div>
          {l ? (
            // `size` only applies to variant="circle" — the default variant
            // ignores it and falls back to width:"100%", which was blowing up
            // this row's flex-shrink math and starving the name/timestamp
            // block (flex-basis:0%) of any space at all.
            <Skeleton width={18} height={18} radius="sm" />
          ) : (
            <button className="text-slate-400 text-lg leading-none px-1">···</button>
          )}
        </div>

        {l ? (
          <TextSkeleton lines={2} lineHeight={20} gap={5} lastLineWidth="60%" />
        ) : (
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Just shipped our new design system! 🎉 After 3 months of work, it&apos;s finally live. 40+ components with full dark mode support.
          </p>
        )}

        {l ? (
          <ImageSkeleton aspectRatio="16/9" className="aspect-video !h-auto" />
        ) : (
          <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Post image</span>
          </div>
        )}

        <div className="flex items-center gap-5 pt-1">
          {l ? (
            // Raw Skeleton, not TextSkeleton — see the tag-row fix above for why.
            <SkeletonGroup direction="row" gap={20}>
              {([0, 1, 2] as const).map(i => <Skeleton key={i} width={40} height={14} />)}
            </SkeletonGroup>
          ) : (
            <>
              {([['♥', '127', 'hover:text-rose-500'], ['💬', '34', 'hover:text-blue-500'], ['↗', '12', 'hover:text-emerald-500']] as const).map(([icon, count, hover]) => (
                <button key={count} className={`flex items-center gap-1.5 text-xs text-slate-500 transition ${hover}`}>
                  <span>{icon}</span><span>{count}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationList({ l }: { l: boolean }) {
  const notes = [
    { icon: '❤️', text: 'Sarah Chen liked your post', time: '2m ago', unread: true },
    { icon: '💬', text: 'Mike Torres commented on your design', time: '15m ago', unread: true },
    { icon: '👤', text: '3 new people followed you', time: '1h ago', unread: false },
    { icon: '🔔', text: 'You were mentioned in a thread', time: '2h ago', unread: false },
  ];
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        {l ? <TextSkeleton lines={1} lineHeight={16} lastLineWidth={100} /> : (
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
        )}
        {l ? <TextSkeleton lines={1} lineHeight={13} lastLineWidth={70} /> : (
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Mark all read</button>
        )}
      </div>
      <div className={ROW_DIV}>
        {l ? (
          notes.map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <Skeleton width={32} height={32} radius="full" />
              <div className="flex-1 space-y-1.5">
                <TextSkeleton lines={1} lineHeight={15} lastLineWidth="75%" />
                <TextSkeleton lines={1} lineHeight={12} lastLineWidth="22%" />
              </div>
            </div>
          ))
        ) : (
          notes.map(n => (
            <div key={n.text} className={`flex items-start gap-3 px-4 py-3 ${n.unread ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base">{n.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{n.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 flex-shrink-0 rounded-full bg-indigo-500 mt-1.5" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CommentThread({ l }: { l: boolean }) {
  const comments = [
    { initials: 'SC', bg: 'bg-purple-100 dark:bg-purple-900/40', fg: 'text-purple-700 dark:text-purple-300', name: 'Sarah Chen', body: 'This is exactly what I needed! The API is super intuitive and clean.', time: '2 hours ago', likes: 12 },
    { initials: 'MT', bg: 'bg-emerald-100 dark:bg-emerald-900/40', fg: 'text-emerald-700 dark:text-emerald-300', name: 'Mike Torres', body: 'Great library! One question: does it support RTL layouts?', time: '4 hours ago', likes: 5 },
    { initials: 'RP', bg: 'bg-blue-100 dark:bg-blue-900/40', fg: 'text-blue-700 dark:text-blue-300', name: 'Ryan Park', body: 'Been using this for 3 months now. Highly recommend to everyone!', time: '1 day ago', likes: 23 },
  ];
  return (
    <div className={CARD}>
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        {l ? <TextSkeleton lines={1} lineHeight={20} lastLineWidth={80} /> : (
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">3 Comments</p>
        )}
      </div>
      <div className={ROW_DIV}>
        {l ? (
          comments.map((_, i) => (
            <div key={i} className="flex gap-3 px-4 py-4">
              <AvatarSkeleton size={34} />
              <div className="flex-1 space-y-2">
                {/* Raw Skeleton, not TextSkeleton — TextSkeleton's wrapper always
                    flex-grows to an equal share of a row (needed elsewhere so a
                    percentage width doesn't collapse to 0), so two TextSkeletons
                    here would always be equal-width boxes no matter what width
                    you ask for. A fixed px Skeleton sizes intrinsically instead. */}
                <SkeletonGroup direction="row" gap={12}>
                  <Skeleton width={72} height={20} />
                  <Skeleton width={64} height={14} />
                </SkeletonGroup>
                <TextSkeleton lines={1} lineHeight={18} gap={4} lastLineWidth="85%" />
                <SkeletonGroup direction="row" gap={12}>
                  <Skeleton width={36} height={12} />
                  <Skeleton width={40} height={12} />
                </SkeletonGroup>
              </div>
            </div>
          ))
        ) : (
          comments.map(c => (
            <div key={c.initials} className="flex gap-3 px-4 py-4">
              <div className={`w-[34px] h-[34px] flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${c.bg} ${c.fg}`}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.name}</span>
                  <span className="text-xs text-slate-400">{c.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.body}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-xs text-slate-400 hover:text-rose-500 transition">♥ {c.likes}</button>
                  <button className="text-xs text-slate-400 hover:text-blue-500 transition">Reply</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 2: Content
══════════════════════════════════════════════════════════════════════════════ */

function BlogArticle({ l }: { l: boolean }) {
  return (
    <div className={CARD}>
      {l ? (
        <ImageSkeleton aspectRatio="16/9" radius="none" className="aspect-video !h-auto" />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
          <span className="text-slate-400 text-sm">Cover image</span>
        </div>
      )}
      <div className="p-4 space-y-3">
        {l ? (
          <TextSkeleton lines={1} lineHeight={22} lastLineWidth={110} />
        ) : (
          <span className="inline-flex items-center h-[22px] text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 rounded-full">
            Design Systems
          </span>
        )}

        {l ? (
          <TextSkeleton lines={1} lineHeight={24} gap={5} lastLineWidth="70%" />
        ) : (
          <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-snug">
            How Skeleton Screens Make Your App Feel Instant
          </h3>
        )}

        {l ? (
          <SkeletonGroup direction="row" gap={10} align="center">
            <div className="flex-shrink-0"><AvatarSkeleton size={28} /></div>
            <SkeletonGroup gap={4}>
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} />
              <TextSkeleton lines={1} lineHeight={12} lastLineWidth={130} />
            </SkeletonGroup>
          </SkeletonGroup>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex-shrink-0 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-xs font-bold text-rose-700 dark:text-rose-300">SC</div>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-none">Sarah Chen</p>
              <p className="text-xs text-slate-400 mt-0.5">July 18, 2026 · 5 min read</p>
            </div>
          </div>
        )}

        {l ? (
          // Raw Skeleton, not TextSkeleton — TextSkeleton's wrapper always
          // flex-grows to an equal share of a row, so 3 tags of different
          // requested widths would still get equal-size boxes with the bar
          // left-aligned inside, leaving huge gaps. Fixed px Skeleton sizes
          // intrinsically instead.
          <SkeletonGroup direction="row" gap={6}>
            {([44, 84, 56] as const).map(w => <Skeleton key={w} width={w} height={22} radius="sm" />)}
          </SkeletonGroup>
        ) : (
          <div className="flex gap-1.5">
            {['UX', 'Performance', 'React'].map(tag => (
              <span key={tag} className="inline-flex items-center h-[22px] text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 rounded-md">{tag}</span>
            ))}
          </div>
        )}

        {l ? (
          <TextSkeleton lines={3} lineHeight={16} gap={5} lastLineWidth="82%" />
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Perceived performance matters as much as actual performance. Skeleton screens create the illusion of speed by showing the content structure before data arrives.
          </p>
        )}
      </div>
    </div>
  );
}

function VideoCard({ l }: { l: boolean }) {
  return (
    <div className={CARD}>
      <div className="relative">
        {l ? (
          <ImageSkeleton aspectRatio="16/9" radius="none" className="aspect-video !h-auto" />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-400 text-3xl">▶</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          {l ? (
            <Skeleton width={40} height={20} radius="sm" />
          ) : (
            <span className="text-xs font-medium text-white bg-black/70 px-1.5 py-0.5 rounded">18:42</span>
          )}
        </div>
      </div>
      <div className="p-3 flex gap-3">
        {l ? (
          <div className="flex-shrink-0"><AvatarSkeleton size={32} /></div>
        ) : (
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">DC</div>
        )}
        <div className="flex-1 min-w-0">
          {l ? (
            <TextSkeleton lines={1} lineHeight={18} gap={4} lastLineWidth="62%" />
          ) : (
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              Building a Design System from Scratch
            </p>
          )}
          <div className="mt-1.5">
            {l ? (
              <SkeletonGroup gap={3}>
                <TextSkeleton lines={1} lineHeight={13} randomizeWidths maxLineWidth={15} />
                <TextSkeleton lines={1} lineHeight={13} randomizeWidths maxLineWidth={20} />
              </SkeletonGroup>
            ) : (
              <>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">DesignCraft Studio</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-none">84K views · 3 days ago</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 3: E-commerce
══════════════════════════════════════════════════════════════════════════════ */

function ProductCard({ l }: { l: boolean }) {
  return (
    <div className={CARD}>
      <div className="relative">
        {l ? (
          <ImageSkeleton aspectRatio="3/4" radius="none" className="aspect-[3/4] !h-auto" />
        ) : (
          <div className="w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center" style={{ aspectRatio: '3/4' }}>
            <span className="text-slate-400 text-sm">Product image</span>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5">
          {l ? (
            <Skeleton width={72} height={20} radius="full" />
          ) : (
            <span className="text-xs font-semibold bg-orange-400 text-white px-2 py-0.5 rounded-full">Best Seller</span>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        {l ? (
          <TextSkeleton lines={2} lineHeight={20} gap={4} lastLineWidth="62%" />
        ) : (
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            Premium Wireless Headphones
          </h3>
        )}
        {l ? (
          <TextSkeleton lines={1} lineHeight={16} lastLineWidth={120} />
        ) : (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-amber-400">★★★★★</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">4.8</span>
            <span className="text-slate-400">(1,243)</span>
          </div>
        )}
        {l ? (
          <SkeletonGroup direction="row" gap={8} align="baseline">
            <TextSkeleton lines={1} lineHeight={28} lastLineWidth={80} />
            <TextSkeleton lines={1} lineHeight={16} lastLineWidth={55} />
          </SkeletonGroup>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">$249.99</span>
            <span className="text-sm text-slate-400 line-through">$349.99</span>
          </div>
        )}
        {l ? (
          <ButtonSkeleton width="100%" height={40} />
        ) : (
          <button className="w-full h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

function PricingCard({ l }: { l: boolean }) {
  const features = ['Unlimited projects', 'Priority support', 'Custom domain', 'Advanced analytics', 'Team collaboration'];
  return (
    <div className={`${CARD} p-6 space-y-5`}>
      <div className="flex items-center justify-between">
        {l ? <TextSkeleton lines={1} lineHeight={16} lastLineWidth="38%" /> : (
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Professional</span>
        )}
        {l ? <Skeleton width={80} height={22} radius="full" /> : (
          <span className="text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full">Most popular</span>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {l ? (
          <TextSkeleton lines={1} lineHeight={48} lastLineWidth={80} />
        ) : (
          <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">$49</span>
        )}
        {l ? (
          <TextSkeleton lines={1} lineHeight={16} lastLineWidth={56} className="ml-1" />
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">/month</span>
        )}
      </div>

      {l ? (
        <TextSkeleton lines={1} lineHeight={16} lastLineWidth="65%" />
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need for growing teams</p>
      )}

      <div className="space-y-2.5">
        {l ? (
          features.map((_, i) => (
            // Real SkeletonGroup, not a raw div — see SidebarNav's fix above
            // for why a plain flex div lets the percentage-width label
            // collapse to 0 and vanish.
            <SkeletonGroup key={i} direction="row" gap={10} align="center">
              <Skeleton size={16} variant="circle" />
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth={`${55 + (i % 3) * 10}%`} />
            </SkeletonGroup>
          ))
        ) : (
          features.map(f => (
            <div key={f} className="flex items-center gap-2.5">
              <span className="w-4 h-4 flex-shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[10px] flex items-center justify-center">✓</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{f}</span>
            </div>
          ))
        )}
      </div>

      {l ? (
        <ButtonSkeleton width="100%" height={44} />
      ) : (
        <button className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition">
          Get Started
        </button>
      )}
    </div>
  );
}

function ProductDetail({ l }: { l: boolean }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  return (
    <div className={`${CARD} p-6`}>
      <div className="grid md:grid-cols-2 gap-8">
        {l ? (
          <ImageSkeleton aspectRatio="1" radius="lg" className="aspect-square !h-auto" />
        ) : (
          <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <span className="text-slate-400">Product Image</span>
          </div>
        )}
        <div className="space-y-4">
          {l ? <TextSkeleton lines={1} lineHeight={14} lastLineWidth="48%" /> : (
            <p className="text-xs text-slate-400">Home / Clothing / Jackets</p>
          )}
          {l ? <TextSkeleton lines={2} lineHeight={28} gap={5} lastLineWidth="82%" /> : (
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              Pro Merino Wool Jacket
            </h2>
          )}
          {l ? <TextSkeleton lines={1} lineHeight={16} lastLineWidth="48%" /> : (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-amber-400">★★★★★</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">4.9</span>
              <span className="text-slate-400">(847 reviews)</span>
            </div>
          )}
          {l ? (
            <SkeletonGroup direction="row" gap={10} align="baseline">
              <TextSkeleton lines={1} lineHeight={36} lastLineWidth={90} />
              <TextSkeleton lines={1} lineHeight={18} lastLineWidth={65} />
              <TextSkeleton lines={1} lineHeight={16} lastLineWidth={55} />
            </SkeletonGroup>
          ) : (
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">$89.99</span>
              <span className="text-base text-slate-400 line-through">$119.99</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">25% off</span>
            </div>
          )}
          {l ? <TextSkeleton lines={3} lineHeight={20} gap={5} lastLineWidth="72%" /> : (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Handcrafted from 100% Merino wool. Naturally temperature-regulating and incredibly soft. Ideal for layering.
            </p>
          )}
          <div>
            {l ? <TextSkeleton lines={1} lineHeight={14} lastLineWidth="22%" className="mb-2" /> : (
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Select size</p>
            )}
            <div className="flex gap-2">
              {l ? (
                sizes.map(s => <Skeleton key={s} width={36} height={36} radius="md" />)
              ) : (
                sizes.map((s, i) => (
                  <button key={s} className={`w-9 h-9 rounded-lg text-xs font-medium border transition ${i === 2 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'}`}>
                    {s}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="flex gap-3">
            {l ? (
              <>
                <div className="flex-1"><ButtonSkeleton width="100%" height={44} /></div>
                <ButtonSkeleton width={44} height={44} />
              </>
            ) : (
              <>
                <button className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition">Add to Cart</button>
                <button className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-200 transition flex items-center justify-center text-lg">♥</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 4: Dashboard & Data
══════════════════════════════════════════════════════════════════════════════ */

function AnalyticsDashboard({ l }: { l: boolean }) {
  const stats = [
    { label: 'Total Users', value: '12,456', change: '+8.2%', up: true },
    { label: 'Revenue', value: '$54.2k', change: '+12.5%', up: true },
    { label: 'Conversion', value: '3.2%', change: '-0.3%', up: false },
    { label: 'Avg. Session', value: '4m 32s', change: '+0.8%', up: true },
  ];
  const activity = [
    { init: 'SC', bg: 'bg-purple-100 dark:bg-purple-900/40', fg: 'text-purple-700 dark:text-purple-300', name: 'Sarah Chen', action: 'uploaded a design file', time: '2m ago' },
    { init: 'MT', bg: 'bg-emerald-100 dark:bg-emerald-900/40', fg: 'text-emerald-700 dark:text-emerald-300', name: 'Mike Torres', action: 'approved your request', time: '5m ago' },
    { init: 'JD', bg: 'bg-orange-100 dark:bg-orange-900/40', fg: 'text-orange-700 dark:text-orange-300', name: 'Jana Dvořák', action: 'left a comment', time: '12m ago' },
    { init: 'RP', bg: 'bg-blue-100 dark:bg-blue-900/40', fg: 'text-blue-700 dark:text-blue-300', name: 'Ryan Park', action: 'starred your repo', time: '1h ago' },
  ];
  const statCard = 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4';
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {l ? (
          stats.map((_, i) => (
            <div key={i} className={statCard}>
              <SkeletonGroup gap={6}>
                <TextSkeleton lines={1} lineHeight={14} lastLineWidth="65%" />
                <TextSkeleton lines={1} lineHeight={36} lastLineWidth="55%" />
                <TextSkeleton lines={1} lineHeight={14} lastLineWidth="42%" />
              </SkeletonGroup>
            </div>
          ))
        ) : (
          stats.map(s => (
            <div key={s.label} className={statCard}>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">{s.label}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-none my-1.5">{s.value}</p>
              <p className={`text-xs font-medium leading-none ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>{s.change}</p>
            </div>
          ))
        )}
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          {l ? <TextSkeleton lines={1} lineHeight={18} lastLineWidth={130} /> : (
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Recent Activity</p>
          )}
        </div>
        <div className={ROW_DIV}>
          {l ? (
            activity.map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-shrink-0"><AvatarSkeleton size={36} /></div>
                <SkeletonGroup gap={5} style={{ flex: 1 }}>
                  <TextSkeleton lines={1} lineHeight={16} lastLineWidth="68%" />
                  <TextSkeleton lines={1} lineHeight={13} lastLineWidth="24%" />
                </SkeletonGroup>
              </div>
            ))
          ) : (
            activity.map(a => (
              <div key={a.init} className="flex items-center gap-3 px-4 py-3">
                <div className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${a.bg} ${a.fg}`}>{a.init}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 truncate leading-none">
                    <span className="font-medium">{a.name}</span>{' '}
                    <span className="text-slate-400">{a.action}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-none">{a.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DataTable({ l }: { l: boolean }) {
  const cols = ['Name', 'Email', 'Role', 'Status', 'Joined'];
  const rows = [
    { name: 'Alex Johnson', email: 'alex@acme.com', role: 'Admin', status: 'Active', joined: 'Jan 2024', sc: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Editor', status: 'Active', joined: 'Mar 2024', sc: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Mike Torres', email: 'mike@acme.com', role: 'Viewer', status: 'Inactive', joined: 'Feb 2024', sc: 'text-slate-400' },
    { name: 'Jana Dvořák', email: 'jana@acme.com', role: 'Editor', status: 'Active', joined: 'Apr 2024', sc: 'text-emerald-600 dark:text-emerald-400' },
    { name: 'Ryan Park', email: 'ryan@acme.com', role: 'Viewer', status: 'Active', joined: 'May 2024', sc: 'text-emerald-600 dark:text-emerald-400' },
  ];
  return (
    <div className={CARD}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              {cols.map(c => (
                <th key={c} className="px-4 py-3 text-left">
                  {l ? <Skeleton height={13} width="70%" /> : (
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{c}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {l ? (
              rows.map((_, ri) => (
                <tr key={ri} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                  {cols.map((c, ci) => (
                    <td key={c} className="px-4 py-3">
                      {ci === 0 ? (
                        <div className="flex items-center gap-2.5">
                          <AvatarSkeleton size={28} />
                          <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} />
                        </div>
                      ) : (
                        <TextSkeleton lines={1} lineHeight={14} lastLineWidth={`${50 + (ci * 10) % 30}%`} />
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              rows.map(r => (
                <tr key={r.email} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.email}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.role}</td>
                  <td className={`px-4 py-3 font-medium ${r.sc}`}>{r.status}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.joined}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 5: Forms & Communication
══════════════════════════════════════════════════════════════════════════════ */

function LoginForm({ l }: { l: boolean }) {
  return (
    <div className={`${CARD} p-6 space-y-5`}>
      <div className="text-center space-y-1">
        {l ? (
          <SkeletonGroup gap={6} align="center">
            <Skeleton width={160} height={26} className="mx-auto" />
            <Skeleton width={210} height={14} className="mx-auto" />
          </SkeletonGroup>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your account</p>
          </>
        )}
      </div>
      {[{ label: 'Email', w: 46 }, { label: 'Password', w: 64 }].map(f => (
        <div key={f.label} className="space-y-1.5">
          {l ? <Skeleton width={f.w} height={13} /> : <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{f.label}</label>}
          {l ? <Skeleton width="100%" height={40} /> : (
            <div className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center">
              <span className="text-sm text-slate-400 dark:text-slate-500">{f.label === 'Email' ? 'you@example.com' : '••••••••'}</span>
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        {l ? <TextSkeleton lines={1} lineHeight={14} lastLineWidth={110} /> : (
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            <span className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 flex-shrink-0" /> Remember me
          </label>
        )}
        {l ? <TextSkeleton lines={1} lineHeight={14} lastLineWidth={90} /> : (
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</button>
        )}
      </div>
      {l ? <ButtonSkeleton width="100%" height={44} /> : (
        <button className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition">Sign in</button>
      )}
      <div className="text-center">
        {l ? <Skeleton width={180} height={13} className="mx-auto" /> : (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No account?{' '}
            <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Create one free</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Chat({ l }: { l: boolean }) {
  const msgs = [
    { isMe: false, text: 'Hey! Did you review the new components?', init: 'SC', bg: 'bg-purple-100 dark:bg-purple-900/40', fg: 'text-purple-700 dark:text-purple-300', h: 36 },
    { isMe: true, text: 'Yes! Just pushed the changes. Can you take a look at the PR?', init: '', bg: '', fg: '', h: 52 },
    { isMe: false, text: 'Looks great! Left a few comments.', init: 'SC', bg: 'bg-purple-100 dark:bg-purple-900/40', fg: 'text-purple-700 dark:text-purple-300', h: 36 },
    { isMe: true, text: 'Thanks, will address them now 👍', init: '', bg: '', fg: '', h: 36 },
  ];
  return (
    <div className={CARD}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        {l ? <div className="flex-shrink-0"><AvatarSkeleton size={32} /></div> : (
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-xs font-bold text-purple-700 dark:text-purple-300">SC</div>
        )}
        <div className="flex-1">
          {l ? (
            <SkeletonGroup gap={3}>
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth={80} />
              <TextSkeleton lines={1} lineHeight={12} lastLineWidth={45} />
            </SkeletonGroup>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Sarah Chen</p>
              <p className="text-xs text-emerald-500 mt-0.5 leading-none">● Online</p>
            </>
          )}
        </div>
      </div>
      <div className="p-4 space-y-3 min-h-[200px]">
        {l ? (
          msgs.map((m, i) => (
            <div key={i} className={`flex gap-2 items-end ${m.isMe ? 'justify-end' : 'justify-start'}`}>
              {!m.isMe && <Skeleton variant="circle" size={24} />}
              <Skeleton width={m.isMe ? '52%' : '60%'} height={m.h} radius="lg" />
            </div>
          ))
        ) : (
          msgs.map((m, i) => (
            <div key={i} className={`flex gap-2 items-end ${m.isMe ? 'justify-end' : 'justify-start'}`}>
              {!m.isMe && (
                <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${m.bg} ${m.fg}`}>{m.init}</div>
              )}
              <div className={`max-w-[65%] text-sm px-3 py-2 rounded-2xl leading-relaxed ${m.isMe ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md'}`}>
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 pb-4 flex gap-2">
        {l ? (
          <>
            <div className="flex-1"><Skeleton width="100%" height={38} radius="full" /></div>
            <Skeleton width={38} height={38} radius="full" />
          </>
        ) : (
          <>
            <div className="flex-1 h-[38px] px-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center">
              <span className="text-sm text-slate-400 dark:text-slate-500">Type a message…</span>
            </div>
            <button className="w-[38px] h-[38px] flex-shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition">↗</button>
          </>
        )}
      </div>
    </div>
  );
}

function SettingsPanel({ l }: { l: boolean }) {
  const items = [
    { label: 'Email notifications', desc: 'Receive updates and alerts by email', on: true },
    { label: 'Two-factor auth', desc: 'Add extra security to your account', on: false },
    { label: 'Activity status', desc: "Show when you're online to others", on: true },
    { label: 'Marketing emails', desc: 'News, updates and promotions', on: false },
  ];
  return (
    <div className={CARD}>
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
        {l ? <TextSkeleton lines={1} lineHeight={18} lastLineWidth={120} /> : (
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Account Settings</p>
        )}
      </div>
      <div className={ROW_DIV}>
        {l ? (
          items.map((_, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 gap-4">
              <div className="flex-1 space-y-1.5">
                <TextSkeleton lines={1} lineHeight={15} lastLineWidth="55%" />
                <TextSkeleton lines={1} lineHeight={13} lastLineWidth="75%" />
              </div>
              <Skeleton width={44} height={24} radius="full" />
            </div>
          ))
        ) : (
          items.map(s => (
            <div key={s.label} className="flex items-center justify-between px-5 py-4 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{s.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.desc}</p>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center px-0.5 flex-shrink-0 ${s.on ? 'bg-indigo-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'}`}>
                <div className="w-5 h-5 rounded-full bg-white shadow" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 6: Navigation & More
══════════════════════════════════════════════════════════════════════════════ */

function SidebarNav({ l }: { l: boolean }) {
  const items = [
    { icon: '⊞', label: 'Dashboard', active: true },
    { icon: '◉', label: 'Analytics', active: false },
    { icon: '□', label: 'Projects', active: false },
    { icon: '◷', label: 'Calendar', active: false },
    { icon: '○', label: 'Messages', active: false },
    { icon: '◎', label: 'Settings', active: false },
  ];
  return (
    <div className={`${CARD} p-4 space-y-4`}>
      <div className="flex items-center gap-2.5 px-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        {l ? <Skeleton width={32} height={32} radius="sm" /> : (
          <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">A</div>
        )}
        {l ? <TextSkeleton lines={1} lineHeight={18} lastLineWidth={80} /> : (
          <span className="font-bold text-slate-900 dark:text-slate-100">AutoSkeleton</span>
        )}
      </div>
      <div className="space-y-0.5">
        {l ? (
          items.map((_, i) => (
            // Real SkeletonGroup, not a raw div — TextSkeleton's percentage
            // width only resolves inside an ambient "row" layout context
            // (set via SkeletonLayoutContext); a plain flex div doesn't
            // provide that, so the label collapsed to 0 width and vanished.
            <SkeletonGroup key={i} direction="row" gap={10} align="center" className="px-2 py-2 rounded-lg">
              <Skeleton width={18} height={18} radius="sm" />
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth={`${45 + (i % 3) * 15}%`} />
            </SkeletonGroup>
          ))
        ) : (
          items.map(item => (
            <div key={item.label} className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition ${item.active ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <span className="text-base w-[18px] text-center leading-none">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))
        )}
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5 px-2">
        {l ? <div className="flex-shrink-0"><AvatarSkeleton size={32} /></div> : (
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">AJ</div>
        )}
        <div className="flex-1 min-w-0">
          {l ? (
            <SkeletonGroup gap={3}>
              <TextSkeleton lines={1} lineHeight={13} lastLineWidth="65%" />
              <TextSkeleton lines={1} lineHeight={11} lastLineWidth="45%" />
            </SkeletonGroup>
          ) : (
            <>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">Alex Johnson</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-none">Free plan</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MusicPlayer({ l }: { l: boolean }) {
  return (
    <div className={`${CARD} p-5 space-y-4`}>
      <div className="flex items-center gap-4">
        {l ? (
          <ImageSkeleton aspectRatio="1" width={72} radius="lg" className="aspect-square !h-auto" style={{ flexShrink: 0 }} />
        ) : (
          <div className="w-[72px] h-[72px] flex-shrink-0 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white text-2xl">♪</div>
        )}
        <div className="flex-1 min-w-0">
          {l ? (
            <SkeletonGroup gap={5}>
              <TextSkeleton lines={1} lineHeight={18} lastLineWidth="72%" />
              <TextSkeleton lines={1} lineHeight={14} lastLineWidth="50%" />
            </SkeletonGroup>
          ) : (
            <>
              <p className="font-semibold text-slate-900 dark:text-slate-100 leading-tight truncate">Midnight Clarity</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">The Echo Session · Reflections</p>
            </>
          )}
        </div>
        {l ? <Skeleton width={20} height={20} radius="full" /> : (
          <button className="text-slate-300 hover:text-rose-500 transition text-xl leading-none">♥</button>
        )}
      </div>

      <div className="space-y-1">
        {l ? <Skeleton width="100%" height={4} radius="full" /> : (
          <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[37%] bg-indigo-600 rounded-full" />
          </div>
        )}
        <div className="flex justify-between">
          {l ? (
            <>
              <TextSkeleton lines={1} lineHeight={12} lastLineWidth={28} />
              <TextSkeleton lines={1} lineHeight={12} lastLineWidth={28} />
            </>
          ) : (
            <>
              <span className="text-xs text-slate-400">1:23</span>
              <span className="text-xs text-slate-400">3:47</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        {l ? (
          <SkeletonGroup direction="row" gap={24} align="center">
            {([0, 1, 2, 3, 4] as const).map(i => <Skeleton key={i} size={i === 2 ? 40 : 22} variant="circle" />)}
          </SkeletonGroup>
        ) : (
          <>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition">⇄</button>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition text-xl">⏮</button>
            <button className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition">▶</button>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition text-xl">⏭</button>
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition">↻</button>
          </>
        )}
      </div>
    </div>
  );
}

function Navbar({ l }: { l: boolean }) {
  const links = ['Features', 'Pricing', 'Docs', 'Blog'];
  return (
    <div className={`${CARD} px-5 py-3 flex items-center gap-6`}>
      {l ? (
        <SkeletonGroup direction="row" gap={8} align="center">
          <Skeleton width={28} height={28} radius="sm" />
          <TextSkeleton lines={1} lineHeight={18} lastLineWidth={100} />
        </SkeletonGroup>
      ) : (
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 flex-shrink-0 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          <span className="font-bold text-slate-900 dark:text-slate-100">AutoSkeleton</span>
        </div>
      )}
      <div className="hidden sm:flex flex-1 items-center gap-5">
        {l ? (
          links.map(link => <TextSkeleton key={link} lines={1} lineHeight={14} lastLineWidth={52} />)
        ) : (
          links.map(link => (
            <span key={link} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition">{link}</span>
          ))
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto sm:ml-0">
        {l ? (
          <>
            <Skeleton width={32} height={32} radius="full" />
            <ButtonSkeleton width={88} height={34} />
            <AvatarSkeleton size={32} />
          </>
        ) : (
          <>
            <button className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-base transition">⌕</button>
            <button className="h-[34px] px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition">Get Started</button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">AJ</div>
          </>
        )}
      </div>
    </div>
  );
}

function SearchResults({ l }: { l: boolean }) {
  const results = [
    { title: 'Getting Started with AutoSkeleton', url: 'docs.autoskeleton.dev/getting-started', snippet: 'Install AutoSkeleton and add it to your React app in minutes. Import the CSS once and use any component immediately.' },
    { title: 'Theming Guide — AutoSkeleton', url: 'docs.autoskeleton.dev/theming', snippet: 'Use SkeletonProvider to configure animations, colors, and border-radius globally across your entire app.' },
    { title: 'Component API Reference', url: 'docs.autoskeleton.dev/components', snippet: 'Complete reference for all 26 components including Skeleton, TextSkeleton, AvatarSkeleton, and more.' },
    { title: 'Real World Examples', url: 'docs.autoskeleton.dev/examples', snippet: 'Pixel-perfect skeleton loading states for profiles, dashboards, e-commerce, and more.' },
  ];
  return (
    <div className="space-y-3">
      <div className={`${CARD} flex items-center gap-3 px-4 h-12`}>
        {l ? (
          <SkeletonGroup direction="row" gap={10} align="center" style={{ flex: 1 }}>
            <Skeleton width={18} height={18} radius="sm" />
            <TextSkeleton lines={1} lineHeight={16} lastLineWidth="40%" />
          </SkeletonGroup>
        ) : (
          <>
            <span className="text-slate-400 text-lg">⌕</span>
            <span className="flex-1 text-sm text-slate-500 dark:text-slate-400">skeleton loading react component library</span>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex-shrink-0">4 results</span>
          </>
        )}
      </div>
      {l ? (
        results.map((_, i) => (
          <div key={i} className={`${CARD} p-4 space-y-1.5`}>
            <TextSkeleton lines={1} lineHeight={12} lastLineWidth="38%" />
            <TextSkeleton lines={1} lineHeight={20} lastLineWidth="76%" />
            <TextSkeleton lines={2} lineHeight={16} gap={4} lastLineWidth="92%" />
          </div>
        ))
      ) : (
        results.map(r => (
          <div key={r.url} className={`${CARD} p-4 space-y-1 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition`}>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">{r.url}</p>
            <p className="font-semibold text-indigo-700 dark:text-indigo-400 hover:underline">{r.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{r.snippet}</p>
          </div>
        ))
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMPLES — Section 7: Creative (not loading UI — just what else you can build)
══════════════════════════════════════════════════════════════════════════════ */

function CreativeCard({ title, description, code, children }: { title: string; description: string; code: string; children: React.ReactNode }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <button
          onClick={() => setShowCode((v) => !v)}
          className="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          {showCode ? 'Preview' : 'Code'}
        </button>
      </div>
      {showCode ? (
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-lg">
          <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[300px] overflow-y-auto text-slate-200">
            <code dangerouslySetInnerHTML={{ __html: highlightTsx(code) }} />
          </pre>
        </div>
      ) : (
        <div className={`${CARD} p-5 flex items-center justify-center`} style={{ minHeight: 160 }}>
          {children}
        </div>
      )}
    </div>
  );
}

const PIANO_KEYS = Array.from({ length: 14 }, (_, i) => i);

function PianoExample() {
  return (
    <SkeletonGroup direction="row" gap={2}>
      {PIANO_KEYS.map((k) => (
        <Skeleton key={k} width={22} height={110} radius="sm" animation="wave" />
      ))}
    </SkeletonGroup>
  );
}

const EQUALIZER_HEIGHTS = [30, 55, 80, 45, 70, 90, 40, 60, 35, 75, 50, 85, 30, 65];

function EqualizerExample() {
  return (
    <SkeletonGroup direction="row" gap={4} align="flex-end" style={{ height: 90 }}>
      {EQUALIZER_HEIGHTS.map((h, i) => (
        <Skeleton
          key={i}
          width={7}
          height={h}
          radius="full"
          animation="pulse"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
    </SkeletonGroup>
  );
}

// Deterministic (not Math.random) so this never mismatches between server and
// client render — see TextSkeleton's randomizeWidths for why that matters.
const HEATMAP_INTENSITY = Array.from({ length: 130 }, (_, i) => ((i * 37) % 100) / 100);

function HeatmapExample() {
  return (
    <SkeletonGroup layout="grid" columns={26} gap={3} animation="none">
      {HEATMAP_INTENSITY.map((intensity, i) => (
        <Skeleton
          key={i}
          width={10}
          height={10}
          radius="sm"
          style={{ opacity: 0.12 + intensity * 0.88 }}
        />
      ))}
    </SkeletonGroup>
  );
}

// A fixed, deterministic pattern — not a real scannable QR code, just its silhouette.
const QR_PATTERN = Array.from({ length: 144 }, (_, i) => {
  const row = Math.floor(i / 12);
  const col = i % 12;
  const inFinder = (row < 3 && col < 3) || (row < 3 && col > 8) || (row > 8 && col < 3);
  return inFinder || (row * 7 + col * 13) % 5 === 0;
});

function QrExample() {
  return (
    <SkeletonGroup layout="grid" columns={12} gap={2} animation="none">
      {QR_PATTERN.map((filled, i) => (
        <Skeleton key={i} width={12} height={12} radius="none" style={{ opacity: filled ? 1 : 0 }} />
      ))}
    </SkeletonGroup>
  );
}

const STARS = [
  { x: 20, y: 20, size: 10 }, { x: 70, y: 45, size: 16 }, { x: 130, y: 15, size: 8 },
  { x: 180, y: 55, size: 22 }, { x: 40, y: 90, size: 12 }, { x: 110, y: 100, size: 10 },
  { x: 220, y: 30, size: 14 }, { x: 250, y: 90, size: 9 }, { x: 160, y: 110, size: 18 },
];

function ConstellationExample() {
  return (
    <div className="relative" style={{ width: 280, height: 130 }}>
      {STARS.map((s, i) => (
        <div key={i} style={{ position: 'absolute', left: s.x, top: s.y }}>
          <AvatarSkeleton size={s.size} animation="fade" />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */

export default function ExamplesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Real-World Examples
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-6">
            23 hand-tuned demos showing how the primitives (Skeleton, TextSkeleton, SkeletonGroup) compose
            into real layouts, plus a few creative detours. Click{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Skeleton</span> or{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Content</span> to instantly compare.
            Looking for the ready-made composites instead? See{' '}
            <a href="/components" className="font-semibold text-slate-800 dark:text-slate-200 underline underline-offset-2 hover:text-indigo-600 dark:hover:text-indigo-400">/components</a>.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { label: 'Same container', desc: 'Identical width, padding, and border-radius' },
              { label: 'Same dimensions', desc: 'Avatar size, image ratio, button height' },
              { label: 'Same hierarchy', desc: 'Every skeleton block maps to a real element' },
            ].map(p => (
              <div key={p.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-indigo-500 mt-0.5 text-base flex-shrink-0">◈</span>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{p.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">

          <Sec title="Profiles & Social" count={4}>
            <ExampleCard title="User Profile" code={CODE_USER_PROFILE}>{(l) => <UserProfile l={l} />}</ExampleCard>
            <ExampleCard title="Social Post" code={CODE_SOCIAL_POST}>{(l) => <SocialPost l={l} />}</ExampleCard>
            <ExampleCard title="Notification List" code={CODE_NOTIFICATION_LIST}>{(l) => <NotificationList l={l} />}</ExampleCard>
            <ExampleCard title="Comment Thread" code={CODE_COMMENT_THREAD}>{(l) => <CommentThread l={l} />}</ExampleCard>
          </Sec>

          <Sec title="Content" count={2}>
            <ExampleCard title="Blog Article" code={CODE_BLOG_ARTICLE}>{(l) => <BlogArticle l={l} />}</ExampleCard>
            <ExampleCard title="Video Card" code={CODE_VIDEO_CARD}>{(l) => <VideoCard l={l} />}</ExampleCard>
          </Sec>

          <Sec title="E-commerce" count={3}>
            <ExampleCard title="Product Card" code={CODE_PRODUCT_CARD}>{(l) => <ProductCard l={l} />}</ExampleCard>
            <ExampleCard title="Pricing Card" code={CODE_PRICING_CARD}>{(l) => <PricingCard l={l} />}</ExampleCard>
            <ExampleCard title="Product Detail" span={2} code={CODE_PRODUCT_DETAIL}>{(l) => <ProductDetail l={l} />}</ExampleCard>
          </Sec>

          <Sec title="Dashboard & Data" count={2}>
            <ExampleCard title="Analytics Dashboard" span={2} code={CODE_ANALYTICS_DASHBOARD}>{(l) => <AnalyticsDashboard l={l} />}</ExampleCard>
            <ExampleCard title="Data Table" span={2} code={CODE_DATA_TABLE}>{(l) => <DataTable l={l} />}</ExampleCard>
          </Sec>

          <Sec title="Forms & Communication" count={3}>
            <ExampleCard title="Login Form" code={CODE_LOGIN_FORM}>{(l) => <LoginForm l={l} />}</ExampleCard>
            <ExampleCard title="Chat Conversation" code={CODE_CHAT}>{(l) => <Chat l={l} />}</ExampleCard>
            <ExampleCard title="Settings Panel" span={2} code={CODE_SETTINGS_PANEL}>{(l) => <SettingsPanel l={l} />}</ExampleCard>
          </Sec>

          <Sec title="Navigation & More" count={4}>
            <ExampleCard title="Sidebar Navigation" code={CODE_SIDEBAR_NAV}>{(l) => <SidebarNav l={l} />}</ExampleCard>
            <ExampleCard title="Music Player" code={CODE_MUSIC_PLAYER}>{(l) => <MusicPlayer l={l} />}</ExampleCard>
            <ExampleCard title="Navbar" span={2} code={CODE_NAVBAR}>{(l) => <Navbar l={l} />}</ExampleCard>
            <ExampleCard title="Search Results" span={2} code={CODE_SEARCH_RESULTS}>{(l) => <SearchResults l={l} />}</ExampleCard>
          </Sec>

          <div className="pt-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Skeletons are just animated, themeable shapes — nothing ties them to &ldquo;loading state.&rdquo;
              A few less conventional ways to use the same primitives.
            </p>
          </div>

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">Creative</h2>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">5</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <CreativeCard title="Piano Keyboard" description="Skeleton bars as keys — no music, just geometry." code={CODE_PIANO}>
                <PianoExample />
              </CreativeCard>
              <CreativeCard title="Audio Equalizer" description="Staggered pulse delays fake a dancing waveform." code={CODE_EQUALIZER}>
                <EqualizerExample />
              </CreativeCard>
              <CreativeCard title="Contribution Heatmap" description="A GitHub-style grid, driven by per-cell opacity." code={CODE_HEATMAP}>
                <HeatmapExample />
              </CreativeCard>
              <CreativeCard title="QR Code Silhouette" description="A grid.map() and some opacity — that's the whole trick." code={CODE_QR}>
                <QrExample />
              </CreativeCard>
              <CreativeCard title="Constellation" description="AvatarSkeleton circles, absolutely positioned as a starfield." code={CODE_CONSTELLATION}>
                <ConstellationExample />
              </CreativeCard>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
