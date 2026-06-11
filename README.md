# 33 Immortals Build Guide — Contributor Guide

This is the source for the 33 Immortals community build guide website. You don't need to be a programmer to update the content — most pages are written in a format close to plain text.

### Just want to fix or add some guide content?

You don't need any of the setup below. See **[CONTRIBUTING.md](CONTRIBUTING.md)** for how to edit pages and upload images **entirely from your web browser** — no installs, no command line, no git. The instructions below are for running the site locally, which is optional.

## Setup (one-time)

1. Install [Node.js](https://nodejs.org/) (LTS version)
2. Open a terminal in this folder and run:
   ```
   npm install
   ```

## Previewing your changes

Run this in a terminal:
```
npm run dev
```
Then open http://localhost:4321 in your browser. The page will update live as you save files.

## Where things live

| What you want to edit | Where to find it |
|---|---|
| Guide text (tips, damage, weapons, etc.) | `src/content/guides/` — one `.mdx` file per page |
| Perk list (names, effects, notes) | `src/data/perks.yml` |
| Relic list (names, effects, rarity) | `src/data/relics.yml` |
| Upgrade list (names, effects, weapons) | `src/data/upgrades.yml` |
| Icons for items | `public/assets/icons/` |
| Videos for build demos | `public/assets/videos/` |
| Site-wide styling | `public/assets/styles.css` |

## Editing a guide page

Guide files are in `src/content/guides/` and use **MDX** format — basically Markdown with a few extras. Here's what you need to know:

### Basic formatting

```markdown
## Section heading

Regular paragraph text. **Bold text**. *Italic text*.

- Bullet point
- Another bullet

1. Numbered item
2. Another item
```

### The top of every file

Each file starts with a header block (called "frontmatter") between `---` lines:

```
---
title: Bow of Hope
lead: Ranged, high attack speed weapon.
---
import Pill from '../../components/Pill.astro';
import Build from '../../components/Build.astro';
import Coop from '../../components/Coop.astro';
```

`title` is required. `lead` is optional — if provided, it appears as a subtitle under the page heading. **Don't remove the import lines** — they enable the special components below.

### Mentioning an item (Pill)

To create an inline reference to a perk, relic, or upgrade (with icon and tooltip):

```
<Pill slug="cosmic-rebirth" />
<Pill slug="worn-scapular" />
<Pill slug="auto-recall" />
```

The `slug` must exactly match the slug in the YAML data files (see `src/data/perks.yml`, `relics.yml`, or `upgrades.yml`).

### Writing a build breakdown (Build)

Builds are collapsible sections. The format is:

```
<Build id="auto-recall-quick-shot" name="Make it Rain" upgrades={["auto-recall", "quick-shot"]} desc="Short description.">

Your build content goes here. Regular markdown works inside.

### Build info

- **Attack speed:** 3.125 arrows per sec
- **Core dps:** 274.2

### Pros

- Good damage
- High mobility

### Cons

- Requires teamwork

</Build>
```

- `id` — a URL-friendly identifier (lowercase, hyphens instead of spaces)
- `name` — the display name shown in the header
- `upgrades` — the two upgrade slugs (must match `src/data/upgrades.yml`)
- `desc` — one-line summary shown below the name

### Showing a weapon's Coop Power icon (Coop)

Weapon pages display a Coop Power icon:

```
import Coop from '../../components/Coop.astro';

<Coop weapon="bow" />
```

The `weapon` value must match the weapon slug in `upgrades.yml` (`bow`, `sword`, `daggers`, `staff`, `glaive`, `crossbows`, `hooks`).

### Adding an image (Figure)

For inline images like formulas or diagrams:

```
import Figure from '../../components/Figure.astro';

<Figure src="/assets/figures/damage/formula.png" alt="Description" variant="banner" />
<Figure src="/assets/maps/map.png" alt="Description" expandable />
```

- `src` and `alt` are required
- `variant` — `"banner"`, `"wide"`, or `"inline"` (controls sizing)
- `expandable` — adds a button to view the image full-size in an overlay

### Highlighting a paragraph (Callout)

Wraps content in a styled highlight box:

```
import Callout from '../../components/Callout.astro';

<Callout>
Important information here.
</Callout>
```

### Adding gameplay videos

Gameplay clips are stored as MP4 videos (not GIFs — they're too large for git). To add a new clip:

1. Start with a GIF or video source file
2. Convert to MP4 using the included script:
   ```
   bash scripts/convert-gifs.sh path/to/source/dir public/assets/videos
   ```
   Or convert a single file with ffmpeg directly:
   ```
   ffmpeg -y -i clip.gif -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -an public/assets/videos/clip.mp4
   ```
3. Reference it in your MDX file:
   ```
   <video class="demo-gif" src="/assets/videos/clip.mp4" autoplay loop muted playsinline preload="none">
     Description of the clip
   </video>
   ```

All paths must start with `/assets/`. **Do not commit GIF files** — they are blocked by `.gitignore`.

### Math formulas

The damage page uses LaTeX math notation, rendered by KaTeX. Inline math uses single dollar signs (`$1.5 \times 0.75$`) and display math uses double:

```
$$
\text{Base} \times \text{Multiplier} \times (1 + \sum\text{Bonuses})
$$
```

This works in any `.mdx` guide page — no extra imports needed.

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|---|---|---|
| data | data | data |
| data | data | data |
```

### Important: escaping `<` characters

If you write a less-than sign in prose (like "deals <5s of damage"), you must escape it with a backslash: `deals \<5s of damage`. Otherwise the site will fail to build.

## Editing perks, relics, or upgrades

These are in simple YAML files in `src/data/`. Each entry looks like:

**Perk** (`src/data/perks.yml`):
```yaml
- slug: cosmic-rebirth
  name: Cosmic Rebirth
  effect: Dash Combos deal +30% damage.
  note: Best perk for builds that make use of Dash Combos.
```

**Relic** (`src/data/relics.yml`):
```yaml
- slug: worn-scapular
  name: Worn Scapular
  category: mobility
  categoryLabel: Mobility
  rarity: common
  effect: Reduces dash cooldown by 25%.
  blessed: Reduces dash cooldown by 40%.
```

**Upgrade** (`src/data/upgrades.yml`):
```yaml
- slug: auto-recall
  name: Auto Recall
  weapon: bow
  weaponLabel: Bow of Hope
  effect: Arrows are automatically recalled after a short delay.
```

`category`/`weapon` are URL-friendly keys; `categoryLabel`/`weaponLabel` are the display names shown on the site.

After editing, run `npm run build` — if something is wrong, the error message will tell you exactly which field is missing or invalid.

## Adding a new item

1. Add the entry to the appropriate YAML file (`perks.yml`, `relics.yml`, or `upgrades.yml`)
2. Add the icon image to `public/assets/icons/{perks,relics,upgrades}/`
3. Add the icon path to `src/data/icons.json`:
   ```json
   "your-slug": { "path": "assets/icons/perks/your-slug.jpg" }
   ```
4. Run `npm run build` to verify everything works

The build generates `/assets/items.json` and `/assets/icons.json` endpoints from your source files — you don't need to touch those output files.

## Publishing changes

After you've verified your changes look correct with `npm run dev`:

```
npm run build
```

This generates the final site in the `dist/` folder, ready to deploy.

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with "frontmatter" error | Check that the `---` block at the top of your MDX file has `title` (required) and optionally `lead` |
| Build fails with "unexpected token" | You probably have a bare `<` — escape it as `\<` |
| Pill shows no icon/tooltip | Make sure the slug matches exactly (check the YAML file) and that `icons.json` has an entry |
| Page not showing in nav | Add a link in `src/layouts/GuideLayout.astro` |
