# AutoSkeleton Roadmap

This roadmap documents the completed and planned direction of the project. Items may change as the library evolves.

---

## Version 0.1 — Foundation ✅

### Components
- [x] Skeleton (core primitive)
- [x] TextSkeleton
- [x] AvatarSkeleton
- [x] ButtonSkeleton
- [x] ImageSkeleton
- [x] SkeletonGroup
- [x] SkeletonProvider
- [x] CardSkeleton

### Infrastructure
- [x] TypeScript support
- [x] CSS custom properties for theming
- [x] Tree-shakable ESM + CJS build
- [x] Package exports map

### Documentation
- [x] README
- [x] DESIGN.md
- [x] ARCHITECTURE.md
- [x] SPECIFICATION.md
- [x] CONTRIBUTING.md
- [x] ROADMAP.md

---

## Version 0.2 — Composite Components ✅

- [x] ProfileSkeleton
- [x] ArticleSkeleton
- [x] TableSkeleton
- [x] ListSkeleton
- [x] DashboardSkeleton
- [x] FormSkeleton
- [x] StatisticCardSkeleton
- [x] MediaObjectSkeleton
- [x] CommentSkeleton
- [x] ChatMessageSkeleton
- [x] ProductCardSkeleton
- [x] GallerySkeleton
- [x] SidebarSkeleton
- [x] NavbarSkeleton
- [x] PricingCardSkeleton
- [x] TimelineSkeleton

---

## Version 0.3 — Animation & Theme ✅

- [x] `easing` prop (CSS timing function)
- [x] `animationDirection` prop (normal / reverse / alternate / alternate-reverse)
- [x] `DARK_THEME` preset
- [x] Arbitrary CSS radius strings (e.g. `"6px 12px"`)
- [x] `prefers-reduced-motion` CSS media query
- [x] CSS custom properties for all theme values

---

## Version 0.4 — Developer Experience ✅

- [x] Storybook (react-vite framework)
- [x] `@storybook/addon-docs` auto-generated documentation
- [x] `@storybook/addon-a11y` accessibility auditing
- [x] `@storybook/addon-vitest` story-based tests
- [x] `@chromatic-com/storybook` visual regression support
- [x] Full JSDoc on all public props and types
- [x] `data-testid` forwarding on `Skeleton`
- [x] Publicly exported `useSkeleton` hook

---

## Version 0.5 — Performance & Testing ✅

- [x] `React.memo` on all components
- [x] `useMemo` for theme objects in `SkeletonProvider` and `SkeletonGroup`
- [x] Vitest + React Testing Library test suite (66 tests)
- [x] `@vitest/coverage-v8` coverage support
- [x] `prepublishOnly` build gate

---

## Version 0.6 — Layout Engine

- [x] Fixed: row-direction `SkeletonGroup` collapsing percentage-width
      children (e.g. `TextSkeleton` next to `AvatarSkeleton`) to 0 width
- [x] Fixed: `variant="rounded"`/`radius` ignoring the `radius` prop and
      theme override
- [x] Native `layout="grid"` mode on `SkeletonGroup` (`columns` prop),
      replacing the `style={{ display: "grid" }}` override pattern
      previously used by `GallerySkeleton`/`DashboardSkeleton`
- [x] Responsive `columns`/`direction` on `SkeletonGroup` via CSS container
      queries (`{ base, sm, md, lg, xl }`) — responds to the group's own
      width, not the viewport
- [x] Real-browser (Chromium, via `@storybook/addon-vitest` + Playwright)
      regression coverage for layout bugs that jsdom can't catch, since
      jsdom never runs actual box-model/flex/grid layout
- [x] `ChartSkeleton` (bar / line / donut) — used by `DashboardSkeleton`'s
      chart region, which previously rendered as a single flat rectangle
- [x] `StoriesBarSkeleton` — horizontally-scrolling avatar row (Instagram/
      Snapchat-style stories bar, or an avatar/chip carousel generally);
      items never shrink to fit, the row scrolls instead
- [x] `CardSkeleton`/`ProfileSkeleton` accept `children`, appended after the
      default composition — a bounded first step toward letting a near-miss
      layout extend a composite instead of reimplementing it from
      primitives. Not a full slot/compound-component redesign; see Future
      Ideas.

---

## Version 1.0 — Stable Release

- [ ] Production-proven API (no breaking changes planned)
- [ ] 100% test coverage
- [x] Full Storybook for all 22+ components
- [ ] Visual regression baseline with Chromatic
- [ ] Accessibility audit completed
- [ ] Performance benchmark published
- [ ] Playground / documentation website

---

## Future Ideas

These ideas are being explored but are not yet scheduled.

### Components
- `DividerSkeleton`
- `BadgeSkeleton`
- `ChipSkeleton`
- `CalendarSkeleton`
- Full slot/compound-component API for `CardSkeleton` and other high-traffic
  composites (`children` today only appends; this would allow reordering,
  replacing, or omitting individual sections)

### Architecture
- Schema-driven layout engine: the 22+ composites are currently fixed,
  hand-authored prop-driven shapes. A declarative layout primitive (a tree
  of node descriptors, with today's composites reimplemented as presets on
  top of it) is the only version of "recreate any UI layout" that scales
  past one-off components — worth prototyping against a few concretely
  "impossible today" layouts (e.g. a Gmail-style multi-column row, a
  YouTube-style video grid) before committing to a schema shape.

### Integrations
- Next.js App Router example project
- Remix example project
- Astro example project
- React Native support

### Tooling
- CLI generator (`npx autoskeleton add ProfileSkeleton`)
- VS Code snippets extension
- ESLint plugin
- Figma UI Kit

### Community
- Interactive example gallery
- Theme marketplace
- Community templates

---

This roadmap is a living document and evolves as AutoSkeleton grows.
