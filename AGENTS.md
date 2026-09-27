# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

LollyPoppe is a personal blog/portfolio site built with Astro 7 (static output), MDX, and a few SolidJS islands. Node version is pinned in `.nvmrc` (22; Astro 7 needs ≥ 22.12).

## Commands

- `npm start` / `npm run dev` — dev server
- `npm run build` — static build to `dist/`
- `npm run build-preview` — build then serve the built output
- `npm run lint` — ESLint over the repo (`eslint.config.mjs`, flat config with `eslint-plugin-astro`; `.ts`/`.tsx` use `@typescript-eslint/parser`. Only file types named in a `files` glob get linted, so a new file type needs its own block)

There is no test suite. Husky's pre-commit hook runs `lint-staged`, which lints staged `*.{jsx,ts,tsx,astro}` files. Notable lint rules: `max-len` 100, `eqeqeq`, `no-unused-vars` as error, and `no-console` except `info`/`warn`/`error`.

## Architecture

- **Content collections** (`src/content.config.ts`): `blog` and `work`, both MDX files under `src/content/<name>/` loaded with the `glob()` loader, with frontmatter validated by Zod 4 (`z` from `astro/zod`). An entry's URL segment is `entry.id` (the filename), and it renders with `render(entry)` from `astro:content`. Blog frontmatter needs `title`, `tags`, `updateDate` (a string transformed to `Date`, written as `"YYYY/MM/DD"`), `description`, plus optional `image` and `draft`.
- **Drafts**: posts with `draft: true` are excluded everywhere — every `getCollection("blog")` call must filter them out (see `src/pages/index.astro`, `src/helpers/getTags.ts`, and the `getStaticPaths` in `blog/[...slug].astro` and `tags/[tag].astro`). Unpublished writing also lives in the top-level `drafts/` folder, outside the collections.
- **Routing**: `src/pages/blog/[...slug].astro` renders posts through `BlogPostLayout`. `src/pages/tags/[tag].astro` builds one page per tag. `work.astro` renders the `work` collection.
- **Layouts**: `PageLayout` is the base layout. `BlogLayout` adds the blog sidebar (the tag list from `getTags`). `BlogPostLayout` wraps rendered MDX in `MarkdownComponent`, which holds the global `.markdown` prose styles.
- **SolidJS islands**: TSX components live in `src/components/navigation/` (the tag button and tags menu), and each keeps its styles in a sibling CSS file. `tsconfig.json` sets `jsxImportSource: "solid-js"`, so write TSX as Solid, not React. Hydrate with `client:*` directives (for example, `TagButton` uses `client:visible`). Islands run in the browser, so they must not import `astro:content` (or helpers such as `getTags`). Fetch the data in the parent `.astro` file and pass it as props, as `Navigation.astro` does with `tags`.
- **Markdown pipeline** (`astro.config.mjs`): Astro 7 defaults to the Sätteri processor. This site sets `markdown.processor: unified({ rehypePlugins: [...] })` from `@astrojs/markdown-remark`, because the rehype plugins need it. `astro-expressive-code` (theme `one-dark-pro`) must stay before `mdx()` in the integrations list. The custom rehype plugin `src/integration/rehype/externalLinks.ts` marks absolute links with `data-external` and `rel`, gives internal links a `data-type` taken from their first path segment, and writes the collected links to `frontmatter.links`. By design, external links do **not** open in a new tab.
- **HTML whitespace**: `compressHTML: true` is set to keep pre-v7 whitespace. Astro 7's default `'jsx'` mode strips the spaces between inline elements.
- **Styling**: plain CSS. Design tokens (spacing, font sizes, colors) are CSS custom properties in `src/styles/variables.css`, and components use them (for example, `var(--space-large)`). Components use scoped `<style>` blocks.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`. The workflow sets up Node from `.nvmrc`, runs `npm ci && npm run build`, then `aws s3 sync --delete dist/` to the `vanessapoppe-me-prod` bucket (eu-west-1), then invalidates CloudFront.
