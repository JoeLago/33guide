import yaml from 'yaml';
import { z } from 'zod';
import { relicSchema, perkSchema, upgradeSchema, type Item } from './schemas';

import relicsRaw from './relics.yml?raw';
import perksRaw from './perks.yml?raw';
import upgradesRaw from './upgrades.yml?raw';

export const relics = z.array(relicSchema).parse(yaml.parse(relicsRaw));
export const perks = z.array(perkSchema).parse(yaml.parse(perksRaw));
export const upgrades = z.array(upgradeSchema).parse(yaml.parse(upgradesRaw));

export const bySlug = new Map<string, Item>(
  [...relics, ...perks, ...upgrades].map(i => [i.slug, i])
);
