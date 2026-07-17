"use client";
import { useState, useEffect } from "react";
import {
  SkeletonBasicDemo,
  SkeletonGroupDemo,
  TextSkeletonDemo,
  AvatarSkeletonDemo,
  ButtonSkeletonDemo,
  ImageSkeletonDemo,
  ArticleSkeletonDemo,
  CardSkeletonDemo,
  ChatMessageSkeletonDemo,
  CommentSkeletonDemo,
  DashboardSkeletonDemo,
  FormSkeletonDemo,
  GallerySkeletonDemo,
  ListSkeletonDemo,
  MediaObjectSkeletonDemo,
  NavbarSkeletonDemo,
  PricingCardSkeletonDemo,
  ProductCardSkeletonDemo,
  ProfileSkeletonDemo,
  SidebarSkeletonDemo,
  StatisticCardSkeletonDemo,
  TableSkeletonDemo,
  TimelineSkeletonDemo,
  ThemeCustomizationDemo,
} from "@/components/SkeletonDemos";
import Header from "@/components/Header";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PropRow {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

interface ComponentEntry {
  id: string;
  name: string;
  category: "Primitives" | "Atomic" | "Composites" | "Theming";
  tagline: string;
  props: PropRow[];
  code: string;
  Demo: React.ComponentType;
}

// ─── Shared base-props (shown inline where extended) ─────────────────────────

const skeletonBaseProps: PropRow[] = [
  { name: "width", type: "number | string", defaultValue: '"100%"', description: "Width of the skeleton." },
  { name: "height", type: "number | string", defaultValue: "16", description: "Height of the skeleton." },
  { name: "size", type: "number | string", defaultValue: "—", description: "Shorthand — sets both width and height." },
  { name: "radius", type: "SkeletonRadius", defaultValue: "theme.radius", description: '"none" | "sm" | "md" | "lg" | "full" | string' },
  { name: "animation", type: "SkeletonAnimation", defaultValue: "theme.animation", description: '"wave" | "pulse" | "fade" | "none"' },
  { name: "variant", type: "SkeletonVariant", defaultValue: '"default"', description: '"default" | "rounded" | "circle"' },
  { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
  { name: "style", type: "CSSProperties", defaultValue: "—", description: "Inline style overrides." },
  { name: "aria-label", type: "string", defaultValue: "—", description: "When set, the skeleton is announced by screen readers." },
  { name: "data-testid", type: "string", defaultValue: "—", description: "HTML test attribute." },
];

const groupBaseProps: PropRow[] = [
  { name: "gap", type: "number | string", defaultValue: "16", description: "Space between children." },
  { name: "padding", type: "number | string", defaultValue: "0", description: "Inner padding." },
  { name: "direction", type: '"row" | "column"', defaultValue: '"column"', description: "Flex direction." },
  { name: "align", type: "CSSProperties[alignItems]", defaultValue: '"stretch"', description: "Cross-axis alignment (align-items)." },
  { name: "justify", type: "CSSProperties[justifyContent]", defaultValue: '"flex-start"', description: "Main-axis alignment (justify-content)." },
  { name: "animation", type: "SkeletonAnimation", defaultValue: "inherited", description: "Overrides animation for all descendants." },
  { name: "duration", type: "number", defaultValue: "inherited", description: "Animation duration in seconds." },
  { name: "easing", type: "string", defaultValue: "inherited", description: "CSS timing function (e.g. 'ease-in-out')." },
  { name: "animationDirection", type: "SkeletonAnimationDirection", defaultValue: "inherited", description: '"normal" | "reverse" | "alternate" | "alternate-reverse"' },
  { name: "radius", type: "SkeletonRadius", defaultValue: "inherited", description: "Overrides border-radius for all descendants." },
  { name: "color", type: "string", defaultValue: "inherited", description: "Base background color." },
  { name: "highlight", type: "string", defaultValue: "inherited", description: "Shimmer highlight color (wave animation)." },
  { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
  { name: "style", type: "CSSProperties", defaultValue: "—", description: "Inline style overrides." },
  { name: "aria-label", type: "string", defaultValue: "—", description: "When set, renders role='status' for screen readers." },
  { name: "aria-busy", type: "boolean", defaultValue: "true", description: "Maps to the HTML aria-busy attribute." },
];

// ─── Component data ──────────────────────────────────────────────────────────

const COMPONENTS: ComponentEntry[] = [
  // ── PRIMITIVES ──────────────────────────────────────────────────────────────
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Primitives",
    tagline: "The core building block. Every other component composes from this.",
    props: skeletonBaseProps,
    code: `import { Skeleton } from "@gyojiro/autoskeleton-react";

// Rectangle
<Skeleton width={300} height={20} />

// Circle via variant
<Skeleton variant="circle" size={48} />

// Pill / rounded
<Skeleton variant="rounded" width="100%" height={40} />

// Custom radius
<Skeleton width={200} height={60} radius="lg" />

// Different animations
<Skeleton animation="pulse" width="100%" height={20} />
<Skeleton animation="fade"  width="100%" height={20} />`,
    Demo: SkeletonBasicDemo,
  },
  {
    id: "skeleton-group",
    name: "SkeletonGroup",
    category: "Primitives",
    tagline: "Flex layout wrapper that also provides a local theme scope for descendants.",
    props: [
      { name: "children", type: "ReactNode", defaultValue: "required", description: "The skeleton children to arrange." },
      ...groupBaseProps,
    ],
    code: `import { SkeletonGroup, AvatarSkeleton, TextSkeleton } from "@gyojiro/autoskeleton-react";

// Column layout (default)
<SkeletonGroup gap={12}>
  <AvatarSkeleton size={40} />
  <TextSkeleton lines={2} />
</SkeletonGroup>

// Row layout
<SkeletonGroup direction="row" gap={12} align="center">
  <AvatarSkeleton size={48} />
  <TextSkeleton lines={2} />
</SkeletonGroup>

// Local theme override — pulse for all children
<SkeletonGroup animation="pulse" animationDirection="alternate">
  <TextSkeleton lines={3} />
</SkeletonGroup>`,
    Demo: SkeletonGroupDemo,
  },
  {
    id: "skeleton-provider",
    name: "SkeletonProvider",
    category: "Primitives",
    tagline: "Global theme provider. Wrap your app (or section) once to configure all skeletons.",
    props: [
      { name: "children", type: "ReactNode", defaultValue: "required", description: "Application or section to theme." },
      { name: "animation", type: "SkeletonAnimation", defaultValue: '"wave"', description: "Default animation for all skeletons." },
      { name: "duration", type: "number", defaultValue: "1.2", description: "Animation duration in seconds." },
      { name: "easing", type: "string", defaultValue: '"ease-in-out"', description: "CSS animation-timing-function." },
      { name: "animationDirection", type: "SkeletonAnimationDirection", defaultValue: '"normal"', description: '"normal" | "reverse" | "alternate" | "alternate-reverse"' },
      { name: "radius", type: "SkeletonRadius", defaultValue: '"md"', description: "Default border-radius preset." },
      { name: "color", type: "string", defaultValue: '"#E5E7EB"', description: "Base skeleton background color." },
      { name: "highlight", type: "string", defaultValue: '"#F9FAFB"', description: "Shimmer highlight color (wave animation)." },
    ],
    code: `import { SkeletonProvider, DARK_THEME } from "@gyojiro/autoskeleton-react";

// Global provider — wrap once at the root
<SkeletonProvider animation="pulse" duration={1.5}>
  <App />
</SkeletonProvider>

// Dark theme preset
<SkeletonProvider {...DARK_THEME}>
  <ProfileSkeleton />
</SkeletonProvider>

// Fully custom theme
<SkeletonProvider
  animation="wave"
  color="#1E293B"
  highlight="#334155"
  radius="lg"
  duration={1.0}
>
  <CardSkeleton />
</SkeletonProvider>`,
    Demo: ThemeCustomizationDemo,
  },

  // ── ATOMIC ──────────────────────────────────────────────────────────────────
  {
    id: "text-skeleton",
    name: "TextSkeleton",
    category: "Atomic",
    tagline: "Renders a block of lines that mimics a paragraph of text.",
    props: [
      { name: "lines", type: "number", defaultValue: "3", description: "Number of lines to render." },
      { name: "gap", type: "number | string", defaultValue: "8", description: "Vertical gap between lines." },
      { name: "lastLineWidth", type: "number | string", defaultValue: '"70%"', description: "Width of the last line (ignored when randomizeWidths is true)." },
      { name: "lineHeight", type: "number | string", defaultValue: "16", description: "Height of each line." },
      { name: "randomizeWidths", type: "boolean", defaultValue: "false", description: "Give each line a random width." },
      { name: "minLineWidth", type: "number", defaultValue: "55", description: "Min % width when randomizeWidths is true." },
      { name: "maxLineWidth", type: "number", defaultValue: "90", description: "Max % width when randomizeWidths is true." },
      { name: "radius", type: "SkeletonRadius", defaultValue: "theme.radius", description: "Border-radius for each line." },
      { name: "animation", type: "SkeletonAnimation", defaultValue: "theme.animation", description: "Animation style." },
      { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
    ],
    code: `import { TextSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 3 lines
<TextSkeleton />

// 5 lines with randomized widths
<TextSkeleton lines={5} randomizeWidths />

// Tall lines for heading-sized text
<TextSkeleton lines={2} lineHeight={28} lastLineWidth="40%" gap={12} />

// 1 line — good for labels
<TextSkeleton lines={1} lineHeight={14} />`,
    Demo: TextSkeletonDemo,
  },
  {
    id: "avatar-skeleton",
    name: "AvatarSkeleton",
    category: "Atomic",
    tagline: "A circular placeholder sized to match avatar images.",
    props: [
      { name: "size", type: "number | string", defaultValue: "40", description: "Diameter of the circle (px or CSS string)." },
      { name: "animation", type: "SkeletonAnimation", defaultValue: "theme.animation", description: "Animation style." },
      { name: "radius", type: "SkeletonRadius", defaultValue: "theme.radius", description: "Border-radius (circles use 'full' implicitly)." },
      { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
    ],
    code: `import { AvatarSkeleton } from "@gyojiro/autoskeleton-react";

// Default 40px
<AvatarSkeleton />

// Larger avatar
<AvatarSkeleton size={64} />

// Small icon size
<AvatarSkeleton size={24} animation="pulse" />`,
    Demo: AvatarSkeletonDemo,
  },
  {
    id: "button-skeleton",
    name: "ButtonSkeleton",
    category: "Atomic",
    tagline: "Rectangular pill placeholder matching button dimensions.",
    props: [
      { name: "width", type: "number | string", defaultValue: "120", description: "Width of the button skeleton." },
      { name: "height", type: "number | string", defaultValue: "40", description: "Height of the button skeleton." },
      { name: "animation", type: "SkeletonAnimation", defaultValue: "theme.animation", description: "Animation style." },
      { name: "radius", type: "SkeletonRadius", defaultValue: "theme.radius", description: "Border-radius." },
      { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
    ],
    code: `import { ButtonSkeleton } from "@gyojiro/autoskeleton-react";

// Default 120×40
<ButtonSkeleton />

// Full-width CTA
<ButtonSkeleton width="100%" height={48} />

// Small button
<ButtonSkeleton width={80} height={32} />

// Rounded pill style
<ButtonSkeleton width={160} height={44} radius="full" />`,
    Demo: ButtonSkeletonDemo,
  },
  {
    id: "image-skeleton",
    name: "ImageSkeleton",
    category: "Atomic",
    tagline: "Aspect-ratio-aware image placeholder. Use aspectRatio instead of a fixed height.",
    props: [
      { name: "width", type: "number | string", defaultValue: '"100%"', description: "Width of the image skeleton." },
      { name: "height", type: "number | string", defaultValue: "200", description: "Height. Ignored when aspectRatio is set." },
      { name: "aspectRatio", type: "string", defaultValue: "—", description: 'CSS aspect-ratio (e.g. "16/9", "4/3", "1"). Derives height from width.' },
      { name: "animation", type: "SkeletonAnimation", defaultValue: "theme.animation", description: "Animation style." },
      { name: "radius", type: "SkeletonRadius", defaultValue: "theme.radius", description: "Border-radius." },
      { name: "className", type: "string", defaultValue: "—", description: "Additional CSS class names." },
    ],
    code: `import { ImageSkeleton } from "@gyojiro/autoskeleton-react";

// Fixed height
<ImageSkeleton height={200} />

// Responsive 16:9 — preferred
<ImageSkeleton aspectRatio="16/9" />

// Square thumbnail
<ImageSkeleton aspectRatio="1" width={200} />

// Product image 4:5
<ImageSkeleton aspectRatio="4/5" radius="none" />`,
    Demo: ImageSkeletonDemo,
  },

  // ── COMPOSITES ──────────────────────────────────────────────────────────────
  {
    id: "article-skeleton",
    name: "ArticleSkeleton",
    category: "Composites",
    tagline: "Full blog-post / article layout: hero image, heading, author row, and body text.",
    props: [
      { name: "showHeroImage", type: "boolean", defaultValue: "true", description: "Show a full-width hero image placeholder." },
      { name: "heroHeight", type: "number", defaultValue: "240", description: "Height of the hero image in pixels." },
      { name: "showAuthor", type: "boolean", defaultValue: "true", description: "Show avatar + name + date author row." },
      { name: "bodyLines", type: "number", defaultValue: "6", description: "Number of body text lines." },
      { name: "showHeading", type: "boolean", defaultValue: "true", description: "Show a section heading placeholder in the body." },
      ...groupBaseProps.filter((p) => !["direction", "align"].includes(p.name)),
    ],
    code: `import { ArticleSkeleton } from "@gyojiro/autoskeleton-react";

// Default
<ArticleSkeleton />

// No hero image, more body lines
<ArticleSkeleton showHeroImage={false} bodyLines={10} />

// Shorter hero
<ArticleSkeleton heroHeight={160} bodyLines={4} />`,
    Demo: ArticleSkeletonDemo,
  },
  {
    id: "card-skeleton",
    name: "CardSkeleton",
    category: "Composites",
    tagline: "Versatile card layout supporting image, avatar, text lines, and a button.",
    props: [
      { name: "direction", type: '"row" | "column"', defaultValue: '"column"', description: "Image on top (column) or left (row)." },
      { name: "showImage", type: "boolean", defaultValue: "true", description: "Show the image placeholder." },
      { name: "showAvatar", type: "boolean", defaultValue: "false", description: "Show an avatar in the content block." },
      { name: "showButton", type: "boolean", defaultValue: "true", description: "Show a button at the bottom." },
      { name: "imageHeight", type: "number | string", defaultValue: "180", description: "Height of the image." },
      { name: "imageWidth", type: "number | string", defaultValue: '"100%"', description: "Width of the image." },
      { name: "avatarSize", type: "number", defaultValue: "48", description: "Avatar diameter (requires showAvatar)." },
      { name: "lines", type: "number", defaultValue: "3", description: "Number of text lines." },
      { name: "lastLineWidth", type: "number | string", defaultValue: '"70%"', description: "Width of the last text line." },
      ...groupBaseProps.filter((p) => !["direction", "align", "justify"].includes(p.name)),
    ],
    code: `import { CardSkeleton } from "@gyojiro/autoskeleton-react";

// Default column card
<CardSkeleton />

// Horizontal / media-object style
<CardSkeleton direction="row" imageHeight={90} imageWidth={120} />

// Blog card with avatar
<CardSkeleton showAvatar lines={4} />

// Content-only card
<CardSkeleton showImage={false} lines={5} />`,
    Demo: CardSkeletonDemo,
  },
  {
    id: "chat-message-skeleton",
    name: "ChatMessageSkeleton",
    category: "Composites",
    tagline: "Chat bubbles layout with alternating left/right alignment and an optional input area.",
    props: [
      { name: "messages", type: "number", defaultValue: "4", description: "Number of chat bubble placeholders." },
      { name: "showInput", type: "boolean", defaultValue: "true", description: "Show a message input placeholder at the bottom." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { ChatMessageSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 4 messages + input
<ChatMessageSkeleton />

// More messages, no input
<ChatMessageSkeleton messages={8} showInput={false} />`,
    Demo: ChatMessageSkeletonDemo,
  },
  {
    id: "comment-skeleton",
    name: "CommentSkeleton",
    category: "Composites",
    tagline: "Stacked comment thread placeholders with avatar, text, and optional action links.",
    props: [
      { name: "items", type: "number", defaultValue: "3", description: "Number of comment placeholders." },
      { name: "lines", type: "number", defaultValue: "2", description: "Text lines per comment body." },
      { name: "avatarSize", type: "number", defaultValue: "36", description: "Commenter avatar diameter." },
      { name: "showActions", type: "boolean", defaultValue: "false", description: "Show like / reply action placeholders." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { CommentSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 3 comments
<CommentSkeleton />

// 5 comments with actions
<CommentSkeleton items={5} showActions />

// Longer comment bodies
<CommentSkeleton lines={3} avatarSize={40} />`,
    Demo: CommentSkeletonDemo,
  },
  {
    id: "dashboard-skeleton",
    name: "DashboardSkeleton",
    category: "Composites",
    tagline: "Full dashboard layout: stat cards, chart area, and a data table.",
    props: [
      { name: "statCards", type: "number", defaultValue: "4", description: "Number of stat cards in the top row." },
      { name: "showChart", type: "boolean", defaultValue: "true", description: "Show the chart placeholder." },
      { name: "chartHeight", type: "number", defaultValue: "280", description: "Height of the chart area in pixels." },
      { name: "tableRows", type: "number", defaultValue: "5", description: "Number of table rows. Set to 0 to hide." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { DashboardSkeleton } from "@gyojiro/autoskeleton-react";

// Default layout
<DashboardSkeleton />

// 3 stats, no table
<DashboardSkeleton statCards={3} tableRows={0} />

// Taller chart, more rows
<DashboardSkeleton chartHeight={400} tableRows={10} />`,
    Demo: DashboardSkeletonDemo,
  },
  {
    id: "form-skeleton",
    name: "FormSkeleton",
    category: "Composites",
    tagline: "Form layout with labeled input fields and a submit button.",
    props: [
      { name: "fields", type: "number", defaultValue: "4", description: "Number of form fields." },
      { name: "showLabels", type: "boolean", defaultValue: "true", description: "Show label placeholders above inputs." },
      { name: "inputHeight", type: "number", defaultValue: "40", description: "Height of each input placeholder." },
      { name: "showSubmitButton", type: "boolean", defaultValue: "true", description: "Show a submit button placeholder." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { FormSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 4 fields + submit
<FormSkeleton />

// Taller inputs, no labels
<FormSkeleton inputHeight={52} showLabels={false} />

// Login form (2 fields)
<FormSkeleton fields={2} />`,
    Demo: FormSkeletonDemo,
  },
  {
    id: "gallery-skeleton",
    name: "GallerySkeleton",
    category: "Composites",
    tagline: "CSS-grid image gallery with configurable columns, count, and aspect ratio.",
    props: [
      { name: "items", type: "number", defaultValue: "9", description: "Total number of image placeholders." },
      { name: "columns", type: "number", defaultValue: "3", description: "Number of grid columns." },
      { name: "aspectRatio", type: "string", defaultValue: '"1"', description: 'CSS aspect-ratio for each cell (e.g. "16/9").' },
      { name: "cellGap", type: "number", defaultValue: "8", description: "Gap between cells in pixels." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { GallerySkeleton } from "@gyojiro/autoskeleton-react";

// Default 3×3 square grid
<GallerySkeleton />

// 4-column landscape grid
<GallerySkeleton columns={4} aspectRatio="16/9" items={8} />

// 2-column portrait grid
<GallerySkeleton columns={2} aspectRatio="3/4" items={6} />`,
    Demo: GallerySkeletonDemo,
  },
  {
    id: "list-skeleton",
    name: "ListSkeleton",
    category: "Composites",
    tagline: "Stacked list items with optional icon, multi-line text, and trailing element.",
    props: [
      { name: "items", type: "number", defaultValue: "5", description: "Number of list items." },
      { name: "showIcon", type: "boolean", defaultValue: "true", description: "Show a circular icon/avatar on the left." },
      { name: "iconSize", type: "number", defaultValue: "36", description: "Diameter of the icon placeholder." },
      { name: "lines", type: "number", defaultValue: "1", description: "Text lines per list item." },
      { name: "showTrailing", type: "boolean", defaultValue: "false", description: "Show a trailing action (chevron / badge)." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { ListSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 5 items with icons
<ListSkeleton />

// Richer items with 2 lines and trailing
<ListSkeleton items={4} lines={2} showTrailing />

// Icon-free plain list
<ListSkeleton showIcon={false} items={8} />`,
    Demo: ListSkeletonDemo,
  },
  {
    id: "media-object-skeleton",
    name: "MediaObjectSkeleton",
    category: "Composites",
    tagline: "Classic media-object pattern: a square or circle media block beside text content.",
    props: [
      { name: "mediaSize", type: "number", defaultValue: "64", description: "Width/height of the media placeholder." },
      { name: "mediaShape", type: '"square" | "circle"', defaultValue: '"square"', description: "Shape of the media block." },
      { name: "lines", type: "number", defaultValue: "2", description: "Text lines in the content block." },
      { name: "mediaPosition", type: '"left" | "right"', defaultValue: '"left"', description: "Position of the media element." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { MediaObjectSkeleton } from "@gyojiro/autoskeleton-react";

// Square thumbnail left (default)
<MediaObjectSkeleton />

// Circle avatar, right side
<MediaObjectSkeleton mediaShape="circle" mediaPosition="right" />

// Larger image block
<MediaObjectSkeleton mediaSize={96} lines={3} />`,
    Demo: MediaObjectSkeletonDemo,
  },
  {
    id: "navbar-skeleton",
    name: "NavbarSkeleton",
    category: "Composites",
    tagline: "Horizontal navbar with logo, navigation links, and action buttons.",
    props: [
      { name: "showLogo", type: "boolean", defaultValue: "true", description: "Show a logo placeholder on the left." },
      { name: "navLinks", type: "number", defaultValue: "4", description: "Number of nav link placeholders." },
      { name: "actions", type: "number", defaultValue: "2", description: "Number of action button/icon placeholders on the right." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { NavbarSkeleton } from "@gyojiro/autoskeleton-react";

// Default: logo + 4 links + 2 actions
<NavbarSkeleton />

// No logo, more links
<NavbarSkeleton showLogo={false} navLinks={6} />

// Minimal: logo + 1 action
<NavbarSkeleton navLinks={0} actions={1} />`,
    Demo: NavbarSkeletonDemo,
  },
  {
    id: "pricing-card-skeleton",
    name: "PricingCardSkeleton",
    category: "Composites",
    tagline: "Pricing tier card with plan name, price, feature list, and CTA button.",
    props: [
      { name: "features", type: "number", defaultValue: "5", description: "Number of feature list items." },
      { name: "showBadge", type: "boolean", defaultValue: "false", description: 'Show a "most popular" badge placeholder.' },
      { name: "showButton", type: "boolean", defaultValue: "true", description: "Show a CTA button at the bottom." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { PricingCardSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 5 features + button
<PricingCardSkeleton />

// Featured plan with badge
<PricingCardSkeleton showBadge features={6} />

// Minimal plan
<PricingCardSkeleton features={3} showButton={false} />`,
    Demo: PricingCardSkeletonDemo,
  },
  {
    id: "product-card-skeleton",
    name: "ProductCardSkeleton",
    category: "Composites",
    tagline: "E-commerce product card with image, name, rating, price, and add-to-cart button.",
    props: [
      { name: "imageHeight", type: "number", defaultValue: "220", description: "Height of the product image placeholder." },
      { name: "showRating", type: "boolean", defaultValue: "true", description: "Show a star-rating row." },
      { name: "showButton", type: "boolean", defaultValue: "true", description: 'Show an "Add to cart" button placeholder.' },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { ProductCardSkeleton } from "@gyojiro/autoskeleton-react";

// Default product card
<ProductCardSkeleton />

// Shorter image, no rating
<ProductCardSkeleton imageHeight={160} showRating={false} />

// No add-to-cart
<ProductCardSkeleton showButton={false} />`,
    Demo: ProductCardSkeletonDemo,
  },
  {
    id: "profile-skeleton",
    name: "ProfileSkeleton",
    category: "Composites",
    tagline: "Social profile layout: centered avatar, name, bio text, stats row, and follow button.",
    props: [
      { name: "avatarSize", type: "number", defaultValue: "80", description: "Avatar diameter in pixels." },
      { name: "bioLines", type: "number", defaultValue: "2", description: "Number of bio text lines." },
      { name: "statsCount", type: "number", defaultValue: "3", description: "Stat columns (followers / following / posts). Set to 0 to hide." },
      { name: "showButton", type: "boolean", defaultValue: "true", description: "Show a follow/connect button." },
      ...groupBaseProps.filter((p) => !["direction", "align"].includes(p.name)),
    ],
    code: `import { ProfileSkeleton } from "@gyojiro/autoskeleton-react";

// Default profile
<ProfileSkeleton />

// Large avatar, more bio
<ProfileSkeleton avatarSize={96} bioLines={3} />

// No stats or button
<ProfileSkeleton statsCount={0} showButton={false} />`,
    Demo: ProfileSkeletonDemo,
  },
  {
    id: "sidebar-skeleton",
    name: "SidebarSkeleton",
    category: "Composites",
    tagline: "App sidebar: branding block, navigation links with optional section headings, user profile.",
    props: [
      { name: "navItems", type: "number", defaultValue: "6", description: "Number of navigation links." },
      { name: "showLogo", type: "boolean", defaultValue: "true", description: "Show a branding/logo block at the top." },
      { name: "showProfile", type: "boolean", defaultValue: "true", description: "Show a user profile block at the bottom." },
      { name: "showSectionHeadings", type: "boolean", defaultValue: "false", description: "Insert section heading separators." },
      { name: "sectionInterval", type: "number", defaultValue: "3", description: "Nav items between each section heading." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { SidebarSkeleton } from "@gyojiro/autoskeleton-react";

// Default sidebar
<SidebarSkeleton />

// With section headings
<SidebarSkeleton showSectionHeadings sectionInterval={3} />

// No user profile
<SidebarSkeleton showProfile={false} navItems={8} />`,
    Demo: SidebarSkeletonDemo,
  },
  {
    id: "statistic-card-skeleton",
    name: "StatisticCardSkeleton",
    category: "Composites",
    tagline: "KPI / stat card with a label, large metric value, change indicator, and optional icon.",
    props: [
      { name: "showIcon", type: "boolean", defaultValue: "true", description: "Show an icon placeholder in the top-right corner." },
      { name: "iconSize", type: "number", defaultValue: "40", description: "Width of the icon placeholder." },
      { name: "metricWidth", type: "number | string", defaultValue: '"60%"', description: "Width of the metric/number placeholder." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { StatisticCardSkeleton } from "@gyojiro/autoskeleton-react";

// Default stat card
<StatisticCardSkeleton />

// Wider metric, no icon
<StatisticCardSkeleton metricWidth="80%" showIcon={false} />`,
    Demo: StatisticCardSkeletonDemo,
  },
  {
    id: "table-skeleton",
    name: "TableSkeleton",
    category: "Composites",
    tagline: "Tabular data placeholder with header row and configurable columns and rows.",
    props: [
      { name: "rows", type: "number", defaultValue: "5", description: "Number of data rows (excluding header)." },
      { name: "columns", type: "number", defaultValue: "4", description: "Number of columns." },
      { name: "showHeader", type: "boolean", defaultValue: "true", description: "Show a header row." },
      { name: "headerHeight", type: "number", defaultValue: "20", description: "Height of header cells." },
      { name: "rowHeight", type: "number", defaultValue: "16", description: "Height of data cells." },
      { name: "rowGap", type: "number", defaultValue: "12", description: "Vertical gap between rows." },
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { TableSkeleton } from "@gyojiro/autoskeleton-react";

// Default: 4 columns × 5 rows + header
<TableSkeleton />

// More data, more columns
<TableSkeleton rows={10} columns={6} />

// No header, taller rows
<TableSkeleton showHeader={false} rowHeight={24} rowGap={16} />`,
    Demo: TableSkeletonDemo,
  },
  {
    id: "timeline-skeleton",
    name: "TimelineSkeleton",
    category: "Composites",
    tagline: "Vertical timeline with connector dots and event content placeholders.",
    props: [
      ...groupBaseProps.filter((p) => !["direction"].includes(p.name)),
    ],
    code: `import { TimelineSkeleton } from "@gyojiro/autoskeleton-react";

// Default timeline
<TimelineSkeleton />

// Slower animation
<TimelineSkeleton duration={2.0} />`,
    Demo: TimelineSkeletonDemo,
  },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const CATEGORIES = ["Primitives", "Atomic", "Composites"] as const;

function Sidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="w-56 shrink-0 py-6 pr-4">
      {CATEGORIES.map((cat) => (
        <div key={cat} className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
            {cat}
          </p>
          {COMPONENTS.filter((c) => c.category === cat).map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                selected === c.id
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

// ─── Props table ─────────────────────────────────────────────────────────────

function PropsTable({ props }: { props: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Prop</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              className={`border-b border-slate-100 dark:border-slate-800/50 ${
                i % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-900/20"
              }`}
            >
              <td className="px-4 py-3 font-mono text-blue-700 dark:text-blue-300 text-xs whitespace-nowrap">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-violet-700 dark:text-violet-300 text-xs">
                {p.type}
              </td>
              <td className="px-4 py-3 font-mono text-emerald-700 dark:text-emerald-400 text-xs whitespace-nowrap">
                {p.defaultValue}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Syntax highlighter ─────────────────────────────────────────────────────

function highlightTsx(raw: string): string {
  const saved: string[] = [];
  const slot = (i: number) => `\x00${i}\x00`;

  let s = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 1. Extract block comments (including JSX {/* */})
  s = s.replace(/(\{?\/\*[\s\S]*?\*\/\}?)/g, (m) => {
    saved.push(`<span style="color:#6b7280;font-style:italic">${m}</span>`);
    return slot(saved.length - 1);
  });

  // 2. Extract // line comments
  s = s.replace(/(^\/\/[^\n]*)/gm, (m) => {
    saved.push(`<span style="color:#6b7280;font-style:italic">${m}</span>`);
    return slot(saved.length - 1);
  });

  // 3. Extract strings (double, single, template)
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (m) => {
    saved.push(`<span style="color:#4ade80">${m}</span>`);
    return slot(saved.length - 1);
  });

  // 4. Numbers — before span injection; skip slot markers via lookbehind
  s = s.replace(/(?<!\x00)\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#fb923c">$1</span>');

  // 5. Booleans / null / undefined
  s = s.replace(
    /\b(true|false|null|undefined)\b/g,
    '<span style="color:#fb923c">$1</span>'
  );

  // 6. Keywords
  s = s.replace(
    /\b(import|export|default|from|const|let|var|function|return|if|else|typeof|type|interface|extends|as|async|await)\b/g,
    '<span style="color:#c084fc">$1</span>'
  );

  // 7. JSX component names (capitalised after &lt; or &lt;/)
  s = s.replace(
    /(&lt;\/?)(\s*)([A-Z][A-Za-z0-9]*)/g,
    (_, br, space, name) => `${br}${space}<span style="color:#7dd3fc">${name}</span>`
  );

  // 8. Restore placeholders
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => saved[parseInt(i)]);

  return s;
}

// ─── Code block ──────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative rounded-xl bg-slate-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-xs text-slate-500">TSX</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-slate-200 transition px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-300"
        dangerouslySetInnerHTML={{ __html: highlightTsx(code) }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  const [selectedId, setSelectedId] = useState("skeleton");

  // Scroll to top whenever the selected component changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [selectedId]);

  const component = COMPONENTS.find((c) => c.id === selectedId) ?? COMPONENTS[0];
  const { Demo } = component;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Page header */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Components</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {COMPONENTS.length} components — 3 primitives, 4 atomic, 17 composites
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden md:block sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
              <Sidebar selected={selectedId} onSelect={setSelectedId} />
            </div>

            {/* Mobile: component picker */}
            <div className="md:hidden py-4 w-full">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {COMPONENTS.filter((c) => c.category === cat).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Main content */}
            <main className="flex-1 min-w-0 py-8 space-y-10">
              {/* Title */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {component.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{component.name}</h2>
                <p className="mt-1 text-slate-500 dark:text-slate-400">{component.tagline}</p>
              </div>

              {/* Live preview */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                  Live Preview
                </h3>
                <Demo />
              </section>

              {/* Props */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                  Props
                </h3>
                <PropsTable props={component.props} />
              </section>

              {/* Code */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                  Usage
                </h3>
                <CodeBlock code={component.code} />
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
