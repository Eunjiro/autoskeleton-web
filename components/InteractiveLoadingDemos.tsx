"use client";
import { useState, useEffect } from "react";
import {
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  ButtonSkeleton,
  SkeletonGroup,
} from "@gyojiro/autoskeleton-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockUser = () => ({
  name: "Alex Johnson",
  role: "Senior Product Designer",
  email: "alex@example.com",
  bio: "Building human-centred products with a focus on accessibility. Based in San Francisco.",
  initials: "AJ",
  followers: "1.4k",
  following: 342,
});

const mockArticle = () => ({
  category: "Design Systems",
  title: "How Skeleton Screens Make Your App Feel Instant",
  author: "Sarah Chen",
  authorInitials: "SC",
  date: "July 18, 2026",
  readTime: "5 min read",
  tags: ["UX", "Performance", "React"],
  excerpt:
    "Perceived performance matters as much as actual performance. Skeleton screens create the illusion of speed by immediately showing the shape of the incoming content before the data arrives.",
});

const mockProduct = () => ({
  name: "Pro Wireless Headphones",
  badge: "Best Seller",
  rating: 4.8,
  reviews: 1243,
  price: "$249.99",
  originalPrice: "$349.99",
});

const mockDashboard = () => ({
  stats: [
    { label: "Total Users", value: "12,456", change: "+8.2%", up: true },
    { label: "Revenue", value: "$54,231", change: "+12.5%", up: true },
    { label: "Growth Rate", value: "+24%", change: "↑ from 18%", up: true },
    { label: "Conversion", value: "3.2%", change: "-0.3%", up: false },
  ],
  activity: [
    { initials: "SC", color: "bg-purple-100 text-purple-700", name: "Sarah Chen", action: "uploaded a new design file", time: "2m ago" },
    { initials: "MT", color: "bg-green-100 text-green-700", name: "Mike Torres", action: "commented on your post", time: "5m ago" },
    { initials: "JD", color: "bg-orange-100 text-orange-700", name: "Jana Dvořák", action: "followed you", time: "12m ago" },
    { initials: "RP", color: "bg-blue-100 text-blue-700", name: "Ryan Park", action: "starred your repository", time: "1h ago" },
  ],
});

// ─── Shared demo chrome ────────────────────────────────────────────────────────

function DemoShell({
  title,
  isLoading,
  onReload,
  children,
}: {
  title: string;
  isLoading: boolean;
  onReload: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            {isLoading ? "Loading…" : "Loaded"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {title}
          </span>
          <button
            onClick={onReload}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            ↺ Reload
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── 1. User Profile ──────────────────────────────────────────────────────────
//
//  Layout (identical in both states):
//  ┌─ card ─────────────────────────────────────────────┐
//  │ [avatar 64px]  Name (text-base bold)               │  ← gap-4 flex row
//  │                Role (text-sm)                       │
//  │                Email (text-sm)                      │
//  ├────────────────────────────────────────────────────┤
//  │ Bio text (2 lines, text-sm, leading-relaxed)        │
//  ├────────────────────────────────────────────────────┤
//  │ Followers / Following  (text-lg bold + text-xs)    │
//  ├────────────────────────────────────────────────────┤
//  │ [Follow button 100%×40px]  [Icon btn 40×40px]      │
//  └────────────────────────────────────────────────────┘

export function UserProfileLoadingDemo() {
  const [data, setData] = useState<ReturnType<typeof mockUser> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => { setData(mockUser()); setIsLoading(false); }, 2000);
    return () => clearTimeout(id);
  }, []);

  const reload = () => {
    setIsLoading(true);
    setData(null);
    setTimeout(() => { setData(mockUser()); setIsLoading(false); }, 2000);
  };

  // Shared card container — same classes in both states
  const card = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden";

  return (
    <DemoShell title="User Profile" isLoading={isLoading} onReload={reload}>
      <div className={card}>
        {/* Top: avatar + identity */}
        <div className="flex items-start gap-4 p-5">
          {isLoading ? (
            <div className="flex-shrink-0"><AvatarSkeleton size={64} /></div>
          ) : (
            <div className="w-16 h-16 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg">
              {data?.initials}
            </div>
          )}

          {/* text column — same height both states */}
          <div className="flex-1 pt-1">
            {isLoading ? (
              <SkeletonGroup direction="column" gap={6}>
                {/* name: text-base font-semibold ~22px line */}
                <TextSkeleton lines={1} lineHeight={22} lastLineWidth="55%" />
                {/* role: text-sm ~18px line */}
                <TextSkeleton lines={1} lineHeight={18} lastLineWidth="72%" />
                {/* email: text-sm ~18px line */}
                <TextSkeleton lines={1} lineHeight={18} lastLineWidth="60%" />
              </SkeletonGroup>
            ) : (
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">{data?.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data?.role}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{data?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bio — 2 lines, text-sm leading-relaxed ≈ lineHeight 20px, gap 6 */}
        <div className="px-5 pb-4">
          {isLoading ? (
            <TextSkeleton lines={2} lineHeight={20} gap={6} lastLineWidth="80%" />
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{data?.bio}</p>
          )}
        </div>

        {/* Stats bar */}
        <div className="flex gap-6 px-5 py-3 border-t border-slate-100 dark:border-slate-800">
          {isLoading ? (
            <>
              <SkeletonGroup direction="column" gap={4}>
                <TextSkeleton lines={1} lineHeight={24} lastLineWidth={50} />
                <TextSkeleton lines={1} lineHeight={14} lastLineWidth={56} />
              </SkeletonGroup>
              <SkeletonGroup direction="column" gap={4}>
                <TextSkeleton lines={1} lineHeight={24} lastLineWidth={50} />
                <TextSkeleton lines={1} lineHeight={14} lastLineWidth={56} />
              </SkeletonGroup>
            </>
          ) : (
            <>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">{data?.followers}</p>
                <p className="text-xs text-slate-400 mt-1">Followers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">{data?.following}</p>
                <p className="text-xs text-slate-400 mt-1">Following</p>
              </div>
            </>
          )}
        </div>

        {/* Actions — Follow btn (flex-1 h-10) + icon btn (w-10 h-10) */}
        <div className="flex gap-3 px-5 pt-3 pb-5">
          {isLoading ? (
            <>
              <div className="flex-1"><ButtonSkeleton width="100%" height={40} /></div>
              <ButtonSkeleton width={40} height={40} />
            </>
          ) : (
            <>
              <button className="flex-1 h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
                Follow
              </button>
              <button className="w-10 h-10 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

// ─── 2. Blog Article ──────────────────────────────────────────────────────────
//
//  Layout:
//  ┌─ card ─────────────────────────────────────────────┐
//  │ [Cover image  16:9]                                 │
//  │ p-5:                                                │
//  │   Category badge (text-xs, h-6)                    │
//  │   Title (2 lines, text-lg bold, lh-28, gap-6)      │
//  │   [Author avatar 32px] Name / date · readTime       │
//  │   Tag chips (3 × text-xs h-6)                      │
//  │   Excerpt paragraph (3 lines, text-sm, lh-20)      │
//  └────────────────────────────────────────────────────┘

export function BlogArticleLoadingDemo() {
  const [data, setData] = useState<ReturnType<typeof mockArticle> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => { setData(mockArticle()); setIsLoading(false); }, 2500);
    return () => clearTimeout(id);
  }, []);

  const reload = () => {
    setIsLoading(true);
    setData(null);
    setTimeout(() => { setData(mockArticle()); setIsLoading(false); }, 2500);
  };

  const card = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden";

  return (
    <DemoShell title="Blog Article" isLoading={isLoading} onReload={reload}>
      <div className={card}>
        {/* Cover image — 16:9 aspect ratio */}
        {isLoading ? (
          <ImageSkeleton width="100%" aspectRatio="16/9" radius="none" />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Cover Image</span>
          </div>
        )}

        <div className="p-5 space-y-3">
          {/* Category badge — text-xs, ~24px tall */}
          {isLoading ? (
            <TextSkeleton lines={1} lastLineWidth={110} lineHeight={24} />
          ) : (
            <span className="inline-flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400 px-2.5 h-6 rounded-full">
              {data?.category}
            </span>
          )}

          {/* Title — 2 lines, text-lg (lh≈28px), gap 6 */}
          {isLoading ? (
            <TextSkeleton lines={2} lineHeight={28} gap={6} lastLineWidth="75%" />
          ) : (
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">{data?.title}</h3>
          )}

          {/* Author meta row — avatar 32px + 2 text lines */}
          {isLoading ? (
            <SkeletonGroup direction="row" gap={10} align="center">
              <div className="flex-shrink-0"><AvatarSkeleton size={32} /></div>
              <SkeletonGroup direction="column" gap={4}>
                <TextSkeleton lines={1} lastLineWidth={100} lineHeight={16} />
                <TextSkeleton lines={1} lastLineWidth={140} lineHeight={14} />
              </SkeletonGroup>
            </SkeletonGroup>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-700">
                {data?.authorInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{data?.author}</p>
                <p className="text-xs text-slate-400">{data?.date} · {data?.readTime}</p>
              </div>
            </div>
          )}

          {/* Tags — 3 chips, each ~h-6 */}
          {isLoading ? (
            <SkeletonGroup direction="row" gap={6}>
              <TextSkeleton lines={1} lastLineWidth={44} lineHeight={24} />
              <TextSkeleton lines={1} lastLineWidth={86} lineHeight={24} />
              <TextSkeleton lines={1} lastLineWidth={56} lineHeight={24} />
            </SkeletonGroup>
          ) : (
            <div className="flex gap-1.5">
              {data?.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center h-6 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt — 3 lines text-sm (lh≈20px), gap 6 */}
          {isLoading ? (
            <TextSkeleton lines={3} lineHeight={20} gap={6} lastLineWidth="85%" />
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{data?.excerpt}</p>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

// ─── 3. Product Card ──────────────────────────────────────────────────────────
//
//  Layout:
//  ┌─ card ─────────────────────────────────────────────┐
//  │ [Product image  4:5]                               │
//  │ p-4:                                               │
//  │   Name (2 lines, text-base bold, lh-22)            │
//  │   Rating row (text-sm, lh-18)                      │
//  │   Price row (text-2xl bold lh-32 + strikethrough)  │
//  │   [Add to Cart  w-full h-11]                       │
//  └────────────────────────────────────────────────────┘

export function ProductCardLoadingDemo() {
  const [data, setData] = useState<ReturnType<typeof mockProduct> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => { setData(mockProduct()); setIsLoading(false); }, 2000);
    return () => clearTimeout(id);
  }, []);

  const reload = () => {
    setIsLoading(true);
    setData(null);
    setTimeout(() => { setData(mockProduct()); setIsLoading(false); }, 2000);
  };

  const card = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden";

  return (
    <DemoShell title="Product Card" isLoading={isLoading} onReload={reload}>
      <div className={card}>
        {/* Product image — 4:5 */}
        {isLoading ? (
          <ImageSkeleton width="100%" aspectRatio="4/5" radius="none" />
        ) : (
          <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
              <span className="text-slate-400 text-sm">Product Image</span>
            </div>
            {data?.badge && (
              <span className="absolute top-3 left-3 text-xs font-semibold bg-orange-400 text-white px-2 py-0.5 rounded-full">
                {data.badge}
              </span>
            )}
          </div>
        )}

        <div className="p-4 space-y-2.5">
          {/* Name — 2 lines text-base (lh≈22px), gap 4, last line shorter */}
          {isLoading ? (
            <TextSkeleton lines={2} lineHeight={22} gap={4} lastLineWidth="65%" />
          ) : (
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">{data?.name}</h3>
          )}

          {/* Rating — single line text-sm (lh≈18px) */}
          {isLoading ? (
            <TextSkeleton lines={1} lastLineWidth={160} lineHeight={18} />
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-sm">{"★".repeat(Math.floor(data?.rating ?? 0))}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{data?.rating}</span>
              <span className="text-xs text-slate-400">({(data?.reviews ?? 0).toLocaleString()} reviews)</span>
            </div>
          )}

          {/* Price row — price text-2xl (lh≈32px) + strikethrough text-sm (lh≈18px) */}
          {isLoading ? (
            <SkeletonGroup direction="row" gap={8} align="baseline">
              <TextSkeleton lines={1} lastLineWidth={90} lineHeight={32} />
              <TextSkeleton lines={1} lastLineWidth={60} lineHeight={18} />
            </SkeletonGroup>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data?.price}</span>
              <span className="text-sm text-slate-400 line-through">{data?.originalPrice}</span>
            </div>
          )}

          {/* CTA button — w-full h-11 */}
          {isLoading ? (
            <ButtonSkeleton width="100%" height={44} />
          ) : (
            <button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

// ─── 4. Dashboard ─────────────────────────────────────────────────────────────
//
//  Layout:
//  ┌─ 2×2 grid ────────────────────────────────────────┐
//  │  stat card: label(text-xs) / value(text-3xl) / Δ  │  × 4
//  └───────────────────────────────────────────────────┘
//  ┌─ activity panel ───────────────────────────────────┐
//  │  header (text-sm semibold)                         │
//  │  [avatar 36px] name + action / time               │  × 4
//  └───────────────────────────────────────────────────┘

export function DashboardStatsLoadingDemo() {
  const [data, setData] = useState<ReturnType<typeof mockDashboard> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => { setData(mockDashboard()); setIsLoading(false); }, 2000);
    return () => clearTimeout(id);
  }, []);

  const reload = () => {
    setIsLoading(true);
    setData(null);
    setTimeout(() => { setData(mockDashboard()); setIsLoading(false); }, 2000);
  };

  // Shared card styles
  const statCard = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4";
  const activityPanel = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800";

  return (
    <DemoShell title="Dashboard" isLoading={isLoading} onReload={reload}>
      <div className="space-y-3">
        {/* Stat cards grid — 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {isLoading
            ? [0, 1, 2, 3].map((i) => (
                <div key={i} className={statCard}>
                  <SkeletonGroup direction="column" gap={6}>
                    {/* label: text-xs lh≈14px */}
                    <TextSkeleton lines={1} lineHeight={14} lastLineWidth="65%" />
                    {/* value: text-3xl lh≈36px */}
                    <TextSkeleton lines={1} lineHeight={36} lastLineWidth="55%" />
                    {/* change: text-xs lh≈14px */}
                    <TextSkeleton lines={1} lineHeight={14} lastLineWidth="40%" />
                  </SkeletonGroup>
                </div>
              ))
            : data?.stats.map((stat, i) => (
                <div key={i} className={statCard}>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-none my-1.5">{stat.value}</p>
                  <p className={`text-xs font-medium leading-none ${stat.up ? "text-emerald-500" : "text-red-500"}`}>{stat.change}</p>
                </div>
              ))}
        </div>

        {/* Activity panel */}
        <div className={activityPanel}>
          {/* Panel header — text-sm semibold lh≈18px */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            {isLoading ? (
              <TextSkeleton lines={1} lastLineWidth={120} lineHeight={18} />
            ) : (
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Recent Activity</p>
            )}
          </div>

          {/* Activity rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading
              ? [0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    {/* avatar 36px */}
                    <div className="flex-shrink-0"><AvatarSkeleton size={36} /></div>
                    {/* name + action (lh≈16px) + time (lh≈14px) */}
                    <SkeletonGroup direction="column" gap={5} style={{ flex: 1 }}>
                      <TextSkeleton lines={1} lineHeight={16} lastLineWidth="70%" />
                      <TextSkeleton lines={1} lineHeight={14} lastLineWidth="28%" />
                    </SkeletonGroup>
                  </div>
                ))
              : data?.activity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${item.color}`}>
                      {item.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300 truncate leading-none">
                        <span className="font-medium">{item.name}</span>{" "}
                        <span className="text-slate-400">{item.action}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-none">{item.time}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
