# 33 Immortals Build Guide — Contributor Guide

This is the source for the 33 Immortals community build guide website. You don't need to be a programmer to update the content — most pages are written in a format close to plain text.

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
| GIFs for build demos | `public/assets/gifs/` |
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

**Don't remove the import lines** — they enable the special components below.

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

### Adding images and GIFs

Place the file in `public/assets/gifs/` or `public/assets/icons/`, then reference it:

```
<img class="demo-gif" src="/assets/gifs/bow-make-it-rain.gif" alt="Description" loading="lazy" />
```

All paths must start with `/assets/`.

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
  rarity: common
  effect: Reduces dash cooldown by 25%.
  blessed: Reduces dash cooldown by 40%.
```

**Upgrade** (`src/data/upgrades.yml`):
```yaml
- slug: auto-recall
  name: Auto Recall
  weapon: bow
  effect: Arrows are automatically recalled after a short delay.
```

After editing, run `npm run build` — if something is wrong, the error message will tell you exactly which field is missing or invalid.

## Adding a new item

1. Add the entry to the appropriate YAML file (`perks.yml`, `relics.yml`, or `upgrades.yml`)
2. Add the icon image to `public/assets/icons/{perks,relics,upgrades}/`
3. Add the icon path to `src/data/icons.json`:
   ```json
   "your-slug": { "path": "assets/icons/perks/your-slug.jpg" }
   ```
4. Run `npm run build` to verify everything works

The runtime JSON files (`items.json`, `icons.json`) are generated automatically during the build — no need to update them by hand.

## Publishing changes

After you've verified your changes look correct with `npm run dev`:

```
npm run build
```

This generates the final site in the `dist/` folder, ready to deploy.

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with "frontmatter" error | Check that the `---` block at the top of your MDX file has both `title` and `lead` |
| Build fails with "unexpected token" | You probably have a bare `<` — escape it as `\<` |
| Pill shows no icon/tooltip | Make sure the slug matches exactly (check the YAML file) and that `icons.json` has an entry |
| Page not showing in nav | Add a link in `src/layouts/GuideLayout.astro` |
