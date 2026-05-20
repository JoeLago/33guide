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
- `src/data/icons.json` — manually maintained icon registry; edit when adding new items
- JSON endpoints (`src/pages/assets/*.json.ts`) generate `/assets/items.json` and `/assets/icons.json` at build time
- All styles live in `public/assets/styles.css` — single file, edit in place
- Client JS is inlined in `GuideLayout.astro` (theme, nav, tooltips, lazy video loading)
- LaTeX math via `remark-math` + `rehype-katex`; KaTeX CSS loaded from CDN in `GuideLayout.astro`

## Gotchas

- Asset paths in MDX must start with `/assets/...` (public directory root)
- Bare `<` in MDX (like `<5s` or `<-`) must be escaped as `\<` to avoid JSX parse errors — this includes `<video>` fallback text content
- Rehype plugin (`plugins/rehype-wrap-tables.mjs`) auto-wraps GFM tables in `.table-wrap`
- Rehype plugin (`plugins/rehype-base-urls.mjs`) rewrites `<img>` and `<video>` src paths for the GitHub Pages base path
- GIF files are blocked by `.gitignore` — convert to MP4 via `scripts/convert-gifs.sh` before committing
- Gameplay videos use `<video class="demo-gif">` with `preload="none"` — an IntersectionObserver in GuideLayout lazy-loads them

## Adding new items

Add to the appropriate YAML file in `src/data/`. Add icon to `public/assets/icons/{type}/` and update `src/data/icons.json`. Build will fail with a Zod error if schema is wrong.

Schema fields (`src/data/schemas.ts`):
- **Relics**: `slug`, `name`, `rarity` (common|rare|epic|legendary|fake), `category`, `categoryLabel`, `effect`, `blessed?`
- **Upgrades**: `slug`, `name`, `weapon`, `weaponLabel`, `effect`, `note?`
- **Perks**: `slug`, `name`, `effect`, `note?`

## Adding gameplay videos

Convert source GIFs to MP4 with `scripts/convert-gifs.sh` (or ffmpeg directly). Place MP4s in `public/assets/videos/`. Reference with `<video class="demo-gif" src="/assets/videos/name.mp4" autoplay loop muted playsinline preload="none">`. Never commit raw GIF files.

## Components (`src/components/`)

| Component | Used in | Purpose |
|---|---|---|
| `Pill` | MDX guides | Inline item reference with icon + tooltip (`slug` prop) |
| `Build` | MDX guides | Collapsible build breakdown (`id`, `name`, `upgrades[]`, `desc?`) |
| `UpgradeList` | MDX guides | Renders all upgrades for a weapon (`weapon` prop) |
| `Coop` | MDX guides | Weapon Coop Power icon (`weapon` prop) |
| `Figure` | MDX guides | Image with variant sizing + optional expand (`src`, `alt`, `variant?`, `expandable?`) |
| `Callout` | MDX guides | Highlight box wrapping slot content |
| `PerkGrid` | `perks.astro` | Server-rendered perk card grid |
| `RelicGrid` | `relics.astro` | Server-rendered relic card grid, filterable by `category` |

## Adding a new page

1. Create `src/content/guides/{slug}.mdx` with `title` frontmatter (`lead` is optional)
2. Create `src/pages/{slug}.astro` using the content-collection pattern
3. Add nav link in `src/layouts/GuideLayout.astro`
