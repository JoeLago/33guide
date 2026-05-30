import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  const body = {
    name: '33 Immortals Build Guide',
    short_name: '33 Guide',
    description: 'Community build guide for 33 Immortals',
    start_url: base,
    scope: base,
    display: 'standalone',
    orientation: 'any',
    background_color: '#15141a',
    theme_color: '#15141a',
    icons: [
      { src: `${base}assets/icons-app/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}assets/icons-app/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
};
