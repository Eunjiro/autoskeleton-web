# AutoSkeleton Architecture

> **Version:** 0.1.5
>
> This document describes the internal architecture of AutoSkeleton, how components are organized, how data flows through the library, and the architectural decisions that guide development.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Architectural Layers](#architectural-layers)
4. [Component Hierarchy](#component-hierarchy)
5. [Theme System](#theme-system)
6. [Rendering Pipeline](#rendering-pipeline)
7. [Primitive Components](#primitive-components)
8. [Composite Components](#composite-components)
9. [Context Architecture](#context-architecture)
10. [Hooks](#hooks)
11. [Utilities](#utilities)
12. [Data Flow](#data-flow)
13. [Performance](#performance)
14. [Testing](#testing)
15. [Storybook](#storybook)
16. [Design Decisions](#design-decisions)

---

## Overview

AutoSkeleton follows a layered architecture built around reusable primitives. Rather than implementing each skeleton independently, every component is composed from a small set of foundational building blocks.

The architecture emphasizes:

- Composition over duplication
- Reusable primitives
- Optional global configuration
- Predictable rendering
- Type safety
- Separation of concerns
- Performance via memoization

---

## Project Structure

```
src/
│
├── components/
│   ├── Skeleton/              # Core primitive
│   ├── SkeletonGroup/         # Layout + local theme scope
│   ├── TextSkeleton/
│   ├── AvatarSkeleton/
│   ├── ButtonSkeleton/
│   ├── ImageSkeleton/
│   ├── CardSkeleton/
│   ├── ArticleSkeleton/
│   ├── ProfileSkeleton/
│   ├── TableSkeleton/
│   ├── ListSkeleton/
│   ├── DashboardSkeleton/
│   ├── FormSkeleton/
│   ├── StatisticCardSkeleton/
│   ├── MediaObjectSkeleton/
│   ├── CommentSkeleton/
│   ├── ChatMessageSkeleton/
│   ├── ProductCardSkeleton/
│   ├── GallerySkeleton/
│   ├── SidebarSkeleton/
│   ├── NavbarSkeleton/
│   ├── PricingCardSkeleton/
│   └── TimelineSkeleton/
│
├── context/
│   ├── SkeletonContext.tsx     # createContext with DEFAULT_THEME
│   └── SkeletonProvider.tsx   # Memoized provider component
│
├── hooks/
│   └── useSkeleton.ts         # useContext(SkeletonContext)
│
├── constants/
│   └── defaultTheme.ts        # DEFAULT_THEME + DARK_THEME
│
├── types/
│   └── theme.types.ts         # All exported TypeScript types
│
└── index.ts                   # Public barrel export
```

Each public component lives inside its own directory and owns its implementation, types, utilities, and barrel export.

---

## Architectural Layers

```
Application
      |
      v
Composite Components        (CardSkeleton, ProfileSkeleton, ...)
      |
      v
Atomic Components           (TextSkeleton, AvatarSkeleton, ...)
      |
      v
Primitive: Skeleton
      |
      v
Theme System                (SkeletonContext / SkeletonProvider)
```

Each layer depends only on the layer below it. No circular dependencies exist.

---

## Component Hierarchy

```
Skeleton (primitive)
|
|-- AvatarSkeleton
|-- ButtonSkeleton
|-- ImageSkeleton
|-- TextSkeleton
|
+-- Composites
    |-- CardSkeleton
    |-- ArticleSkeleton
    |-- ProfileSkeleton
    |-- TableSkeleton
    |-- ListSkeleton
    |-- DashboardSkeleton
    |-- FormSkeleton
    |-- StatisticCardSkeleton
    |-- MediaObjectSkeleton
    |-- CommentSkeleton
    |-- ChatMessageSkeleton
    |-- ProductCardSkeleton
    |-- GallerySkeleton
    |-- SidebarSkeleton
    |-- NavbarSkeleton
    |-- PricingCardSkeleton
    +-- TimelineSkeleton
```

Every component ultimately renders one or more primitive `Skeleton` instances. No animation or styling logic is duplicated.

---

## Theme System

Theme values propagate via React Context.

```
DEFAULT_THEME (constants/defaultTheme.ts)
        |
        v
SkeletonContext (createContext with DEFAULT_THEME as default value)
        |
        v
SkeletonProvider (optional — merges user props via useMemo)
        |
        v
SkeletonGroup (optional — merges group-level overrides via useMemo)
        |
        v
useSkeleton() hook
        |
        v
Skeleton (reads theme, writes CSS custom properties inline)
```

Because `createContext` is called with `DEFAULT_THEME`, the provider is entirely optional.

### Theme Shape

```ts
interface SkeletonTheme {
  animation: "wave" | "pulse" | "fade" | "none";
  duration: number;
  easing: string;
  animationDirection: "normal" | "reverse" | "alternate" | "alternate-reverse";
  radius: "none" | "sm" | "md" | "lg" | "full" | (string & {});
  color: string;
  highlight: string;
}
```

### CSS Custom Properties

The `Skeleton` component writes theme values as CSS custom properties on the element inline style:

| CSS Variable | Source |
|---|---|
| `--skeleton-color` | `theme.color` |
| `--skeleton-highlight` | `theme.highlight` |
| `--skeleton-duration` | `theme.duration` |
| `--skeleton-easing` | `theme.easing` |
| `--skeleton-direction` | `theme.animationDirection` |

CSS animations consume these variables, so theme changes require no JavaScript re-animation logic.

---

## Rendering Pipeline

```
<ProfileSkeleton>
        |
        v
AvatarSkeleton + TextSkeleton + ButtonSkeleton (via SkeletonGroup)
        |
        v
<Skeleton> (reads CSS vars from context)
        |
        v
<div class="skeleton skeleton-wave" style="--skeleton-color:...; ...">
        |
        v
DOM
```

---

## Primitive Components

| Component | Responsibility |
|---|---|
| `Skeleton` | Single placeholder block. Reads theme, applies CSS vars, handles shape variants and aria. Wrapped with `React.memo`. |
| `SkeletonGroup` | Flex container. Merges group-level theme overrides. Provides `aria-label`/`aria-busy`. Wrapped with `React.memo`. |

---

## Composite Components

Composite components combine primitives into complete loading UI patterns. They accept configuration props and delegate all rendering to primitives via `SkeletonGroup`. They never implement animation or color logic directly.

---

## Context Architecture

```
createContext(DEFAULT_THEME)   <- no provider needed
        |
        v
SkeletonContext
        |
        v
useSkeleton()                  <- publicly exported hook
        |
        v
Every Skeleton component
```

`SkeletonProvider` uses `useMemo` to avoid creating a new context value object on every render unless a theme prop actually changes. `SkeletonGroup` does the same.

---

## Hooks

### `useSkeleton()`

```ts
function useSkeleton(): SkeletonTheme
```

Returns the current theme from context. Publicly exported for use in custom skeleton components.

---

## Utilities

### `getRadiusValue(radius)`
Maps `SkeletonRadius` presets to CSS pixel values. Unknown strings pass through unchanged, enabling arbitrary CSS like `"6px 12px"`.

### `getSkeletonDimensions(props)`
Resolves `width`, `height`, `size`, and `variant` into concrete CSS dimension values.

### `getRandomWidth(min, max)`
Returns a random integer in `[min, max]` for `TextSkeleton` random line widths.

---

## Data Flow

```
SkeletonProvider (global defaults)
        |
        v
SkeletonGroup (optional local override)
        |
        v
Skeleton (CSS custom properties applied inline)
        |
        v
Rendered placeholder in DOM
```

If no provider exists, `Skeleton` reads directly from `createContext(DEFAULT_THEME)`.

---

## Performance

| Technique | Applied To |
|---|---|
| `React.memo` | All components |
| `useMemo` for theme object | `SkeletonProvider`, `SkeletonGroup` |
| CSS animations | All animations via `@keyframes` + CSS custom properties |
| `will-change: opacity, transform` | `.skeleton` base class |
| `prefers-reduced-motion` media query | Disables all animations in CSS |
| Tree-shaking via ESM | All exports named, side-effect-free except CSS |

---

## Testing

Tests live in `src/test/` and run with Vitest + jsdom + React Testing Library.

| File | Tests |
|---|---|
| `Skeleton.test.tsx` | 14 — rendering, variants, animations, aria, theme |
| `SkeletonGroup.test.tsx` | 5 — layout, theme propagation, aria |
| `components.test.tsx` | 15 — TextSkeleton, AvatarSkeleton, ButtonSkeleton, ImageSkeleton, CardSkeleton |
| `newComponents.test.tsx` | 32 — all 16 composite components |

**Total: 66 tests passing.**

```bash
npm test                # single run
npm run test:watch      # watch mode
npm run test:coverage   # coverage report
```

---

## Storybook

Stories live in `stories/` at the project root.

Addons: `@storybook/addon-docs`, `@storybook/addon-a11y`, `@storybook/addon-vitest`, `@chromatic-com/storybook`.

```bash
npm run storybook           # dev server at http://localhost:6006
npm run build-storybook     # static build
npm run test:storybook      # headless story tests via Vitest
```

---

## Design Decisions

### Primitive First
Every feature reuses the `Skeleton` primitive. No composite implements its own animation.

### Composition Over Inheritance
Components compose existing components rather than class inheritance.

### Optional Provider
`SkeletonProvider` is never required. `createContext(DEFAULT_THEME)` ensures sane global defaults.

### `SkeletonGroup` as Both Layout and Theme Scope
Rather than having separate layout and theme-override components, `SkeletonGroup` serves both purposes, reducing API surface area.

### `direction` vs `animationDirection`
`SkeletonGroup.direction` controls flex layout direction. `SkeletonTheme.animationDirection` controls CSS `animation-direction`. These are intentionally separate to avoid naming conflicts.

### CSS Custom Properties Over JavaScript Theming
All animation values are injected as CSS variables. Theme changes propagate through CSS without React re-renders, and `prefers-reduced-motion` is handled in a single CSS media query with no JavaScript involvement.
