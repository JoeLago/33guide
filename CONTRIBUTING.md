# Contributing — edit the guide from your browser

You can improve this guide **entirely from your web browser**. No downloads, no
command line, no git. The only thing you need is a free
[GitHub account](https://github.com/join).

**You can't break anything.** Every change you make becomes a *suggestion* that a
maintainer reviews before it goes live. Nothing you do here touches the real
website until someone approves it.

## How it works (the 30-second version)

1. You click an **edit** link below and change some text (or upload a photo).
2. GitHub saves your change as a **proposal** (called a "pull request").
3. A maintainer looks it over, fixes anything small if needed, and accepts it.
4. The live site at <https://JoeLago.github.io/33guide/> updates automatically a
   few minutes later.

That's it. The sections below are just links to the things you'd most likely want
to change.

---

## Edit an existing guide page

Click the ✏️ link for the page you want to change:

| Guide page | Edit it |
|---|---|
| General Tips | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/general-tips.mdx) |
| Making a Build | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/making-a-build.mdx) |
| Everything about Damage | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/damage.mdx) |
| Empathy & Coop Powers | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/empathy-coop.mdx) |
| Ordeals & Agony | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/ordeals.mdx) |
| Bow of Hope | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/bow.mdx) |
| Crossbows of Pride | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/crossbows.mdx) |
| Daggers of Greed | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/daggers.mdx) |
| Glaive of Temperance | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/glaive.mdx) |
| Hooks of Gluttony | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/hooks.mdx) |
| Staff of Sloth | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/staff.mdx) |
| Sword of Justice | [✏️ Edit](https://github.com/JoeLago/33guide/edit/main/src/content/guides/sword.mdx) |

**Steps after you click:**

1. If GitHub says you need to **fork** the project, click the green button — this
   is normal and just gives you your own copy to edit.
2. Make your changes in the text box.
3. Scroll down and click **Commit changes…** (or **Propose changes**).
4. Click **Create pull request** on the next screen. Done — a maintainer takes it
   from here.

### Quick formatting cheatsheet

These pages are mostly plain text. The few things worth knowing:

```markdown
## A section heading

Normal paragraph. **Bold text**, *italic text*.

- a bullet
- another bullet

1. numbered item
2. another item

| Column A | Column B |
|---|---|
| data | data |
```

To mention a perk, relic, or upgrade inline (it shows the icon and a tooltip):

```
<Pill slug="cosmic-rebirth" />
```

The `slug` must exactly match the one in the data files (see the next section).

**One gotcha:** if you type a less-than sign `<` in normal text (like "lasts
\<5s"), write it as `\<` — a bare `<` will break the page.

> Want fancier things like collapsible build breakdowns, Coop icons, or sized
> images? Those have their own components — see the
> [README](README.md#editing-a-guide-page) for the full list.

---

## Edit perks, relics, or upgrades

These are simple lists. Click to edit:

- [✏️ Perks](https://github.com/JoeLago/33guide/edit/main/src/data/perks.yml)
- [✏️ Relics](https://github.com/JoeLago/33guide/edit/main/src/data/relics.yml)
- [✏️ Upgrades](https://github.com/JoeLago/33guide/edit/main/src/data/upgrades.yml)

Each item is a small block. **Match the spacing and indentation of the entries
already in the file** — that's the most common thing to get wrong.

**Perk:**
```yaml
- slug: cosmic-rebirth
  name: Cosmic Rebirth
  effect: Dash Combos deal +30% damage.
  note: Best perk for builds that make use of Dash Combos.
```

**Relic:**
```yaml
- slug: worn-scapular
  name: Worn Scapular
  rarity: common
  category: mobility
  categoryLabel: Mobility
  effect: Reduces dash cooldown by 25%.
  blessed: Reduces dash cooldown by 40%.
```

**Upgrade:**
```yaml
- slug: auto-recall
  name: Auto Recall
  weapon: bow
  weaponLabel: Bow of Hope
  effect: Arrows are automatically recalled after a short delay.
```

`note`, `blessed` are optional. `category`/`weapon` are lowercase keys;
`categoryLabel`/`weaponLabel` are the names shown on the site.

---

## Add a photo or screenshot

Use GitHub's **Add file → Upload files** on the right folder, or use these direct
links:

- Diagrams / screenshots for a guide →
  [⬆️ Upload to `figures`](https://github.com/JoeLago/33guide/upload/main/public/assets/figures)
- Maps →
  [⬆️ Upload to `maps`](https://github.com/JoeLago/33guide/upload/main/public/assets/maps)

Drag your image in, then **Commit changes** and **Create pull request** (same as
editing).

To show the image on a page, add this where you want it in the guide (paths
always start with `/assets/…`):

```
<Figure src="/assets/figures/your-image.png" alt="What the image shows" />
```

**Easiest approach:** upload the image first, then mention the filename in your
pull request — a maintainer can place it on the page for you.

---

## Add a brand-new perk, relic, or upgrade (with its icon)

This one's a *little* more involved because three things have to line up:

1. The text entry in the YAML file (see above).
2. The icon image, uploaded to
   `public/assets/icons/perks/`, `…/relics/`, or `…/upgrades/`.
3. A matching line in
   [`src/data/icons.json`](https://github.com/JoeLago/33guide/edit/main/src/data/icons.json).

If that feels fiddly, **don't worry about it** — just
[open an issue](https://github.com/JoeLago/33guide/issues/new) with the item's
details and the icon image attached, and a maintainer will add it. The full
steps are in the [README](README.md#adding-a-new-item).

---

## Want to add a gameplay clip?

Gameplay clips on this site are short, silent, looping **MP4** videos. If you can
record or export an MP4, you can upload it just like a photo:
[⬆️ Upload to `videos`](https://github.com/JoeLago/33guide/upload/main/public/assets/videos).

**Please upload MP4, not GIF** — GIFs are several times larger and aren't accepted
by the project. Most screen recorders (the built-in Xbox Game Bar on Windows,
QuickTime on Mac, OBS, or your console's clip/share feature) already save MP4.

A few things that keep clips small and looking right on the site:

- **Format:** MP4 with H.264 video (the most common default).
- **Keep it short** — usually 2–6 seconds, trimmed to just the thing you're
  showing.
- **Audio doesn't matter** — clips play muted, so feel free to mute or leave it.
- **File size:** aim for a few MB. If yours is much larger, trim it shorter or
  lower the resolution to 720p.

After uploading, reference it in a guide page like this:

```
<video class="demo-gif" src="/assets/videos/your-clip.mp4" autoplay loop muted playsinline preload="none">
  Short description of the clip
</video>
```

(Or just mention the filename in your pull request and a maintainer will place
it on the page.)

**Only have a GIF or some other format?** No problem —
[open an issue](https://github.com/JoeLago/33guide/issues/new) and attach or link
your clip, and a maintainer will convert it and add it for you.

---

## Not comfortable editing? Just suggest it

You don't have to touch any files. Spotted a mistake or have an idea?
**[Open an issue](https://github.com/JoeLago/33guide/issues/new)** and describe
the change in plain words. A maintainer will take care of the rest.

---

## What happens after you submit

A maintainer reviews your proposal, may leave a comment or make a small tweak,
then accepts it. Once accepted, the live site updates within a few minutes. Your
change is safe and reversible the whole time — nothing goes public without a
review. Thanks for helping! 🙏
