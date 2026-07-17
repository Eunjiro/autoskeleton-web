# AutoSkeleton Design

> **Version:** 0.1.5
>
> This document describes the design philosophy, goals, and guiding principles behind AutoSkeleton.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Vision](#vision)
3. [Design Goals](#design-goals)
4. [Non-Goals](#non-goals)
5. [Core Principles](#core-principles)
6. [Component Philosophy](#component-philosophy)
7. [Theming Philosophy](#theming-philosophy)
8. [Developer Experience](#developer-experience)
9. [API Design](#api-design)
10. [Performance Philosophy](#performance-philosophy)
11. [Accessibility](#accessibility)

---

## Introduction

AutoSkeleton is a production-ready React library for building beautiful, reusable loading skeletons. It provides a complete design system for loading states through composable primitives and higher-level components.

The library is built around one principle:

> Every loading UI should be easy to build, customize, and maintain.

---

## Vision

Our vision is to become the most developer-friendly skeleton loading library for React.

AutoSkeleton provides:

- Beautiful default components
- Powerful customization
- Zero unnecessary configuration
- Excellent TypeScript support
- Minimal API surface
- High performance
- Composable architecture

---

## Design Goals

### 1. Simplicity

A skeleton should be easy to render with no required configuration:

```tsx
<Skeleton />
```

No provider required. No stylesheet setup beyond a single import.

### 2. Composability

Small components compose into larger loading interfaces:

```
Skeleton → AvatarSkeleton → ProfileSkeleton
```

### 3. Consistency

Every skeleton shares animations, colors, border radius, and timing through a unified theme system.

### 4. Customization

Every default is overridable. Developers should never feel locked into one design.

### 5. Type Safety

Every public API provides excellent TypeScript support. The library minimizes runtime errors through compile-time validation and IntelliSense-ready JSDoc.

### 6. Performance

Skeletons should render quickly. The library avoids unnecessary re-renders through `React.memo` and `useMemo`, and uses CSS animations exclusively.

---

## Non-Goals

AutoSkeleton intentionally does not attempt to become:

- A CSS framework
- A general component framework
- A design system
- An animation library

AutoSkeleton focuses exclusively on loading placeholder states.

---

## Core Principles

### Primitive First

Everything starts with the primitive `Skeleton` component. Higher-level components reuse primitives instead of implementing their own rendering logic.

### Composition Over Duplication

Instead of specialized implementations, components compose existing primitives:

```
CardSkeleton → ImageSkeleton → Skeleton
```

Animation logic is never duplicated.

### Sensible Defaults

AutoSkeleton looks good without configuration. Developers obtain attractive loading placeholders immediately after installation.

### Progressive Customization

Simple for beginners, powerful for experienced users:

```tsx
// Simple
<Skeleton />

// Advanced
<SkeletonGroup animation="pulse" color="#ddd" gap={16} animationDirection="alternate">
  <ProfileSkeleton />
</SkeletonGroup>
```

---

## Component Philosophy

### Primitive Components

The foundation of the library. Remain reusable, predictable, and independent.

- `Skeleton`
- `TextSkeleton`
- `AvatarSkeleton`
- `ButtonSkeleton`
- `ImageSkeleton`
- `SkeletonGroup`

### Composite Components

Built entirely from primitives. Never duplicate primitive logic.

- `CardSkeleton`, `ArticleSkeleton`, `ProfileSkeleton`
- `TableSkeleton`, `ListSkeleton`, `DashboardSkeleton`
- `FormSkeleton`, `StatisticCardSkeleton`, `MediaObjectSkeleton`
- `CommentSkeleton`, `ChatMessageSkeleton`, `ProductCardSkeleton`
- `GallerySkeleton`, `SidebarSkeleton`, `NavbarSkeleton`
- `PricingCardSkeleton`, `TimelineSkeleton`

---

## Theming Philosophy

The library ships with sensible defaults. Global customization is optional via `SkeletonProvider`. Local customization is available via `SkeletonGroup`. Theme inheritance follows React Context.

The theme includes: `animation`, `duration`, `easing`, `animationDirection`, `radius`, `color`, `highlight`.

The built-in `DARK_THEME` preset provides ready-made dark mode colors.

---

## Developer Experience

Developer experience is a primary design objective:

- Minimal boilerplate
- Intuitive APIs
- Helpful TypeScript autocompletion via JSDoc
- Tree-shakable
- Framework-friendly (Vite, Next.js, Remix, CRA)
- Public `useSkeleton` hook for custom integrations

A developer should be productive within minutes.

---

## API Design

### Consistency

Components expose similar prop names wherever possible: `width`, `height`, `animation`, `radius`, `className`, `style`.

### Predictability

A prop has the same meaning across the library. `animation="none"` always means no animation, regardless of component.

### Extensibility

Future components integrate naturally without breaking API changes.

---

## Performance Philosophy

Performance is considered during every design decision:

- Minimal DOM nodes
- `React.memo` on all components
- `useMemo` for theme objects in `SkeletonProvider` and `SkeletonGroup`
- CSS animations over JavaScript animations
- CSS custom properties for runtime theme values (no re-render on theme change)
- `will-change: opacity, transform` on the base skeleton class
- Tree-shakable ESM build

---

## Accessibility

Skeletons are decorative loading placeholders and must not interfere with assistive technologies.

- Default: `aria-hidden="true"`
- Meaningful loading regions: `aria-label` + `role="status"`
- `SkeletonGroup` supports `aria-label` and `aria-busy`
- Individual `Skeleton` supports `aria-label`
- `prefers-reduced-motion`: all animations disabled via a single CSS media query
- No interactive elements or keyboard focus in any skeleton component

Accessibility is a core feature, not an afterthought.
