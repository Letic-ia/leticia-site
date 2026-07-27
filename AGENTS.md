# AGENTS.md

Context for AI coding agents (Copilot, etc.) working in this repository.

## What this is

`leticia-site` is the public marketing site plus documentation for Leticia
(an on-premise, voice-driven AI interrogation platform for escape games),
built with **Docusaurus 3** (TypeScript) and deployed to GitHub Pages at
the custom domain `leticia-app.com`. This repo has **no application source
code**: it is purely the vitrine (one-page marketing site) and the `/docs`
section (installation, configuration, provider/model reference, etc.).

The actual app lives in a separate (private) repo; this site's docs are the
**user-facing** counterpart to that repo's internal engineering docs, so
keep wording accessible to a non-developer venue operator, and never
reference internal file paths, line numbers, or implementation details.

## Repository layout

```
docusaurus.config.ts   Site config: navbar, plugins, theme, redirects
sidebars.ts             Docs sidebar structure
src/pages/index.tsx     The marketing homepage (vitrine): a single page,
                        built from a large HTML string (see below) plus a
                        few real React islands (ContactForm, etc.)
src/components/         React components used on the homepage/docs
src/theme/               Swizzled/wrapped Docusaurus theme components
                        (e.g. src/theme/SearchBar wraps the search plugin
                        to hide it outside /docs/*)
src/css/
  custom.css            Global theme (Infima variable overrides, navbar)
  landing.css           Homepage-only styles (all `.lt-*` classes)
docs/                   User-facing Markdown docs, rendered at /docs/*
static/                 Images, logo, favicon
```

## Architecture patterns to follow

**The homepage is one big HTML string, not idiomatic JSX.** `src/pages/
index.tsx`'s `markup()` function returns a template literal of raw HTML
(lowercase `class=`, inline `<svg>` icons) that gets rendered via
`dangerouslySetInnerHTML`. This is intentional: the vitrine is a static,
content-heavy one-pager and this keeps it easy to edit as a whole. **Only
break a section out into real JSX/React when it needs actual
interactivity** (state, event handlers, effects), e.g. `ContactForm.tsx` is
a real React component mounted as a sibling of the `dangerouslySetInnerHTML`
div specifically because it needs form state and a fetch call. Don't
convert the whole homepage to JSX as a "cleanup."

**Section reveal-on-scroll is pure CSS, not JavaScript.** Elements with
class `.lt-reveal` animate in via a CSS `@starting-style`/view-timeline
technique in `landing.css`; there is no `IntersectionObserver` to wire up.
Add `.lt-reveal` to a new section's wrapper and it just works.

**Docs vs. vitrine styling and chrome differ on purpose**, using
Docusaurus's own static `<html class="plugin-docs ...">` marker (set at
build time, no client JS needed):
- The navbar search box (`@easyops-cn/docusaurus-search-local`, `Ctrl+K`/
  `Cmd+K`) is scoped to `/docs/*` only, via `src/theme/SearchBar/index.tsx`
  wrapping the plugin's original component and returning `null` when
  `pathname === '/'`.
- The "Leticia" navbar text is hidden on doc pages (CSS: `html.plugin-docs
  .navbar__title { display: none; }` in `custom.css`) since the docs
  sidebar already gives page context; the vitrine keeps the full
  logo plus wordmark.
- When adding chrome that should differ between the vitrine and docs,
  prefer this static-class-plus-CSS approach over a client-side route
  check where possible: it works with zero JS and survives SSG cleanly.

**`/docs` (bare) redirects to `/docs/intro`** via
`@docusaurus/plugin-client-redirects` in `docusaurus.config.ts`; there is
no page at the docs root itself.

## Coding conventions

- TypeScript throughout (`tsconfig.json`); run `npx tsc` before shipping.
  There is no separate lint script configured in this repo, `tsc` is the
  gate.
- **Never use an em dash anywhere** (Unicode U+2014). Use a comma, colon,
  semicolon, or parentheses instead. (Same convention as the main Leticia
  app repo.)
- French is the only configured locale (`i18n.defaultLocale: 'fr'`,
  `locales: ['fr']`); this site is not currently internationalized, so
  write all content in French.
- Match the existing brick-red brand palette and `--lt-*` CSS custom
  properties in `landing.css` / `custom.css` rather than introducing new
  ad-hoc colors; both a light and dark scheme are maintained
  (`html[data-theme="dark"] .lt-root { ... }`).

## Commands

```
npm run start    # dev server
npm run build    # production build, must succeed with onBrokenLinks: 'throw'
npm run serve    # serve the production build locally
npx tsc          # typecheck
```

`docusaurus.config.ts` sets `onBrokenLinks: 'throw'`, so a broken internal
link fails the build outright. Broken *anchor* warnings (e.g. footer links
to homepage section IDs from doc pages) are pre-existing and non-fatal;
don't chase them as part of an unrelated change.

## Contact form

`src/components/ContactForm.tsx` submits client-side to
[Web3Forms](https://web3forms.com) (no backend of its own, since this is a
static GitHub Pages site). The access key is a placeholder constant
(`WEB3FORMS_ACCESS_KEY`) at the top of that file; a real deployment needs a
real key from web3forms.com in its place.

## Commits, PRs

- Conventional Commits style is followed here too, though this repo has no
  automated changelog generation like the main app repo.
- PRs target `main`.
