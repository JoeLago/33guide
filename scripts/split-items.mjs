import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'yaml';

const items = JSON.parse(readFileSync('/Users/joe/dev/33/assets/items.json', 'utf8'));

for (const kind of ['relics', 'perks', 'upgrades']) {
  writeFileSync(
    new URL(`../src/data/${kind}.yml`, import.meta.url),
    yaml.stringify(items[kind], { lineWidth: 0 })
  );
}

console.log(`Wrote ${items.relics.length} relics, ${items.perks.length} perks, ${items.upgrades.length} upgrades`);
