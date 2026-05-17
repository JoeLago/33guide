import type { APIRoute } from 'astro';
import icons from '../../data/icons.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(icons));
};
