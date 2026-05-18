# 33 Immortals Astro Site

Astro+MDX static site — community build guide for **33 Immortals**.

## Commands

```sh
npm run dev      # dev server (http://localhost:4321)
npm run build    # static build → dist/
npm run preview  # serve dist/ locally
```

## Key patterns

- MDX guide pages: content collection (`src/content/guides/`) → `GuideLayout`
- Data-driven pages (perks, relics): YAML in `src/data/` → Zod validation → server-rendered grids
- `src/data/icons.json` is machine-generated — don't hand-edit
- JSON endpoints (`src/pages/assets/*.json.ts`) generate `/assets/items.json` and `/assets/icons.json` at build time
- All styles live in `public/assets/styles.css` — single file, edit in place
- Client JS is inlined in `GuideLayout.astro` (theme, nav, tooltips)

## Gotchas

- Asset paths in MDX must start with `/assets/...` (public directory root)
- Bare `<` in MDX (like `<5s` or `<-`) must be escaped as `\<` to avoid JSX parse errors
- Rehype plugin (`plugins/rehype-wrap-tables.mjs`) auto-wraps GFM tables in `.table-wrap`

## Adding new items

Add to the appropriate YAML file in `src/data/`. Add icon to `public/assets/icons/{type}/` and update `src/data/icons.json`. Build will fail with a Zod error if schema is wrong.

## Adding a new page

1. Create `src/content/guides/{slug}.mdx` with `title` and `lead` frontmatter
2. Create `src/pages/{slug}.astro` using the content-collection pattern
3. Add nav link in `src/layouts/GuideLayout.astro`

## Remaining work

1. Search index generation
