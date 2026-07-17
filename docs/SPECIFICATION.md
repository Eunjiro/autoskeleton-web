# AutoSkeleton Specification

> **Version:** 0.1.5
>
> This document defines the public API, component behavior, type definitions, default values, accessibility requirements, and implementation contracts of AutoSkeleton.

---

## Table of Contents

1. [Overview](#overview)
2. [Public API](#public-api)
3. [Theme Specification](#theme-specification)
4. [Component Specifications](#component-specifications)
5. [Animations](#animations)
6. [Variants](#variants)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [TypeScript](#typescript)
10. [Package Exports](#package-exports)
11. [Semantic Versioning](#semantic-versioning)
12. [Compatibility](#compatibility)

---

## Overview

AutoSkeleton is composed of small reusable components built from a single primitive. The public API is intentionally minimal and stable.

---

## Public API

```
@gyojiro/autoskeleton-react

Primitives:
  Skeleton
  SkeletonGroup
  SkeletonProvider

Atomic:
  TextSkeleton
  AvatarSkeleton
  ButtonSkeleton
  ImageSkeleton

Composites:
  CardSkeleton
  ArticleSkeleton
  ProfileSkeleton
  TableSkeleton
  ListSkeleton
  DashboardSkeleton
  FormSkeleton
  StatisticCardSkeleton
  MediaObjectSkeleton
  CommentSkeleton
  ChatMessageSkeleton
  ProductCardSkeleton
  GallerySkeleton
  SidebarSkeleton
  NavbarSkeleton
  PricingCardSkeleton
  TimelineSkeleton

Hook:
  useSkeleton

Constants:
  DARK_THEME

Types:
  SkeletonTheme
  SkeletonAnimation
  SkeletonAnimationDirection
  SkeletonRadius
  SkeletonVariant
```

Internal utilities (`getRadiusValue`, `getSkeletonDimensions`, etc.) are not exported.

---

## Theme Specification

Theme values are inherited through React Context. The provider is optional.

### Default Theme

```ts
const DEFAULT_THEME: SkeletonTheme = {
  animation: "wave",
  duration: 1.2,
  easing: "ease-in-out",
  animationDirection: "normal",
  radius: "md",
  color: "#E5E7EB",
  highlight: "#F9FAFB",
};
```

### Dark Theme Preset

```ts
const DARK_THEME: Partial<SkeletonTheme> = {
  color: "#374151",
  highlight: "#4B5563",
};
```

### Theme Properties

| Property | Type | Default |
|---|---|---|
| `animation` | `"wave" \| "pulse" \| "fade" \| "none"` | `"wave"` |
| `duration` | `number` (seconds) | `1.2` |
| `easing` | `string` (CSS timing function) | `"ease-in-out"` |
| `animationDirection` | `"normal" \| "reverse" \| "alternate" \| "alternate-reverse"` | `"normal"` |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "full" \| string` | `"md"` |
| `color` | `string` (CSS color) | `"#E5E7EB"` |
| `highlight` | `string` (CSS color) | `"#F9FAFB"` |

### CSS Custom Properties

All theme values are written as inline CSS variables on each `Skeleton` element:

| Variable | Mapped From |
|---|---|
| `--skeleton-color` | `color` |
| `--skeleton-highlight` | `highlight` |
| `--skeleton-duration` | `duration` |
| `--skeleton-easing` | `easing` |
| `--skeleton-direction` | `animationDirection` |

---

## Component Specifications

### Skeleton

The primitive building block.

| Prop | Type | Default |
|---|---|---|
| `width` | `number \| string` | `"100%"` |
| `height` | `number \| string` | `16` |
| `size` | `number \| string` | — |
| `variant` | `"default" \| "rounded" \| "circle"` | `"default"` |
| `radius` | `SkeletonRadius \| string` | theme |
| `animation` | `SkeletonAnimation` | theme |
| `className` | `string` | — |
| `style` | `CSSProperties` | — |
| `aria-label` | `string` | — |
| `data-testid` | `string` | — |

**Behavior:**
- Decorative by default: `aria-hidden="true"`
- When `aria-label` is provided: `role="status"` is added and `aria-hidden` removed
- CSS class pattern: `skeleton skeleton-{animation}`
- Circle variant adds `flexShrink: 0`

---

### SkeletonProvider

| Prop | Type |
|---|---|
| `children` | `ReactNode` |
| `...Partial<SkeletonTheme>` | All theme props |

**Behavior:** Merges `DEFAULT_THEME` with provided props via `useMemo`.

---

### SkeletonGroup

| Prop | Type | Default |
|---|---|---|
| `direction` | `"row" \| "column"` | `"column"` |
| `gap` | `number \| string` | `16` |
| `padding` | `number \| string` | `0` |
| `align` | `CSSProperties["alignItems"]` | `"stretch"` |
| `justify` | `CSSProperties["justifyContent"]` | `"flex-start"` |
| `aria-label` | `string` | — |
| `aria-busy` | `boolean` | `true` |
| `...Partial<SkeletonTheme>` | All theme props | — |

**Behavior:**
- When `aria-label` provided: `role="status"` + `aria-busy`
- Merges theme from parent context with group-level overrides via `useMemo`

---

### TextSkeleton

Extends `Omit<SkeletonProps, "width" | "height" | "size" | "variant">`.

| Prop | Type | Default |
|---|---|---|
| `lines` | `number` | `3` |
| `lineHeight` | `number \| string` | `16` |
| `gap` | `number \| string` | `8` |
| `lastLineWidth` | `number \| string` | `"70%"` |
| `randomizeWidths` | `boolean` | `false` |
| `minLineWidth` | `number` | `55` |
| `maxLineWidth` | `number` | `90` |

---

### AvatarSkeleton

| Prop | Type | Default |
|---|---|---|
| `size` | `number \| string` | `48` |

Always renders `variant="circle"`.

---

### ButtonSkeleton

| Prop | Type | Default |
|---|---|---|
| `width` | `number \| string` | `120` |
| `height` | `number \| string` | `40` |

Uses `variant="rounded"` by default.

---

### ImageSkeleton

| Prop | Type | Default |
|---|---|---|
| `width` | `number \| string` | `"100%"` |
| `height` | `number \| string` | `180` |
| `aspectRatio` | `string` | — |

When `aspectRatio` is set, `height` becomes `undefined` and CSS `aspect-ratio` takes over.

---

### CardSkeleton

| Prop | Type | Default |
|---|---|---|
| `direction` | `"row" \| "column"` | `"column"` |
| `showImage` | `boolean` | `true` |
| `showAvatar` | `boolean` | `false` |
| `showButton` | `boolean` | `true` |
| `imageWidth` | `number \| string` | `"100%"` |
| `imageHeight` | `number` | `180` |
| `avatarSize` | `number` | `48` |
| `lines` | `number` | `3` |
| `gap` | `number \| string` | `12` |
| `padding` | `number \| string` | `16` |

Composed from: `ImageSkeleton`, `AvatarSkeleton`, `TextSkeleton`, `ButtonSkeleton`, `SkeletonGroup`.

---

### Composite Components (summary)

All composite components accept theme override props and are wrapped with `React.memo`.

| Component | Key Props |
|---|---|
| `ArticleSkeleton` | `showImage`, `lines`, `showAuthor` |
| `ProfileSkeleton` | `showCover`, `showBio`, `showStats`, `showButton` |
| `TableSkeleton` | `rows`, `columns`, `showHeader` |
| `ListSkeleton` | `items`, `showIcon`, `iconSize` |
| `DashboardSkeleton` | `cards`, `showChart`, `showTable` |
| `FormSkeleton` | `fields`, `showButton` |
| `StatisticCardSkeleton` | `showIcon`, `showTrend` |
| `MediaObjectSkeleton` | `imageWidth`, `imageHeight`, `lines` |
| `CommentSkeleton` | `lines`, `avatarSize` |
| `ChatMessageSkeleton` | `messages` |
| `ProductCardSkeleton` | `showBadge`, `showRating`, `showButton` |
| `GallerySkeleton` | `items`, `columns` |
| `SidebarSkeleton` | `navItems`, `showLogo`, `showProfile` |
| `NavbarSkeleton` | `navItems`, `showLogo`, `showButton` |
| `PricingCardSkeleton` | `features`, `showBadge` |
| `TimelineSkeleton` | `items` |

---

## Animations

| Value | Behavior |
|---|---|
| `"wave"` | Left-to-right shimmer sweep via `::after` pseudo-element |
| `"pulse"` | Opacity 1 → 0.45 → 1 cycle |
| `"fade"` | Opacity 0.5 → 1 → 0.5 cycle |
| `"none"` | `animation: none` — static placeholder |

All animations use CSS custom properties for duration, easing, and direction. All are disabled when `prefers-reduced-motion: reduce` is active.

---

## Variants

| Value | Border Radius |
|---|---|
| `"default"` | From theme radius |
| `"rounded"` | `9999px` |
| `"circle"` | `50%` + equal width/height |

---

## Accessibility

**Requirements:**
- Decorative skeletons: `aria-hidden="true"`
- Loading regions: `role="status"` + `aria-label`
- No interactive behavior; no keyboard focus
- All animations disabled under `prefers-reduced-motion: reduce`

---

## Performance

**Requirements:**
- CSS-only animations
- `React.memo` on all components
- `useMemo` for theme merge in provider and group
- `will-change: opacity, transform` on base skeleton
- Minimal DOM depth per component
- Tree-shakable exports

---

## TypeScript

All public APIs are fully typed. The library exports:

- `SkeletonTheme`
- `SkeletonAnimation`
- `SkeletonAnimationDirection`
- `SkeletonRadius`
- `SkeletonVariant`
- All component prop types (e.g. `SkeletonProps`, `SkeletonProviderProps`, etc.)

Type inference works without manual generics.

---

## Package Exports

```json
{
  ".": {
    "types":   "./dist/index.d.ts",
    "import":  "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./style.css": "./dist/index.css"
}
```

`sideEffects: ["**/*.css"]` ensures CSS is never tree-shaken.

---

## Semantic Versioning

### Major (x.0.0)
Breaking API changes — prop renames, component removals, behavior changes.

### Minor (0.x.0)
New components, new props, backward-compatible improvements.

### Patch (0.0.x)
Bug fixes, performance improvements, documentation updates.

---

## Compatibility

| Requirement | Version |
|---|---|
| React | 18+ or 19+ |
| TypeScript | 5+ (6.x supported) |
| Node.js | 18+ (build only) |
| Browsers | Modern evergreen (Chrome, Firefox, Safari, Edge) |
