# Contributing to AutoSkeleton

Thank you for considering contributing to AutoSkeleton!

---

## Development Setup

```bash
git clone https://github.com/Eunjiro/autoskeleton.git
cd autoskeleton
npm install
```

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (single run) |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run test:storybook` | Storybook story tests via Vitest |
| `npm run storybook` | Launch Storybook at localhost:6006 |
| `npm run build-storybook` | Build static Storybook |

---

## Project Structure

```
src/
  components/     All component implementations
  context/        SkeletonContext + SkeletonProvider
  hooks/          useSkeleton
  constants/      DEFAULT_THEME, DARK_THEME
  types/          theme.types.ts
  index.ts        Public barrel export

src/test/         Vitest + RTL unit tests
stories/          Storybook stories
docs/             Documentation
.storybook/       Storybook configuration
```

Each component owns its own folder: `ComponentName.tsx`, `ComponentName.types.ts`, `index.ts`.

---

## Coding Guidelines

### TypeScript
- Use TypeScript; avoid `any`
- Import types with `import type` (`verbatimModuleSyntax` is enabled)
- Add JSDoc to all public props and exported types

### Components
- Wrap all components with `React.memo`
- Use `useMemo` for derived theme objects in providers and groups
- Compose from existing primitives — never duplicate rendering logic

### Styling
- CSS animations only — no JavaScript animations
- Use CSS custom properties (`--skeleton-*`) for theme values
- All animations must respect `prefers-reduced-motion`

### Naming
- Components: `PascalCase`
- Props: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Accessibility
- Skeletons are decorative by default (`aria-hidden="true"`)
- Support `aria-label` + `role="status"` for meaningful loading regions
- No interactive elements or keyboard focus in skeleton components

---

## Adding a New Component

1. Create `src/components/MyNewSkeleton/`
2. Add `MyNewSkeleton.tsx` — `React.memo`, composed from primitives
3. Add `MyNewSkeleton.types.ts` — JSDoc on all props
4. Add `index.ts` barrel export
5. Export from `src/index.ts`
6. Add tests in `src/test/`
7. Add a Storybook story in `stories/`

---

## Pull Request Process

- Build passes: `npm run build`
- Lint passes: `npm run lint`
- All tests pass: `npm test`
- Keep PRs focused on a single change
- Update documentation when necessary

---

## Reporting Bugs

Include: AutoSkeleton version, React version, TypeScript version, browser, steps to reproduce, expected vs actual behavior.

---

## Suggesting Features

Check existing issues, explain the use case, describe the proposed API, and explain why it belongs in AutoSkeleton.

---

Thank you for helping improve AutoSkeleton.
