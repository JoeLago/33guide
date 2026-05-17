import type { APIRoute } from 'astro';
import { relics, perks, upgrades } from '../../data/items';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ relics, perks, upgrades }));
};
