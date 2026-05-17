import { z } from 'zod';

export const relicSchema = z.object({
  slug: z.string(),
  name: z.string(),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary', 'fake']),
  category: z.string(),
  categoryLabel: z.string(),
  effect: z.string(),
  blessed: z.string().optional(),
});

export const perkSchema = z.object({
  slug: z.string(),
  name: z.string(),
  effect: z.string(),
  note: z.string().optional(),
});

export const upgradeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  weapon: z.string(),
  weaponLabel: z.string(),
  effect: z.string(),
  note: z.string().optional(),
});

export type Relic = z.infer<typeof relicSchema>;
export type Perk = z.infer<typeof perkSchema>;
export type Upgrade = z.infer<typeof upgradeSchema>;
export type Item = Relic | Perk | Upgrade;
