import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeWrapTables from './plugins/rehype-wrap-tables.mjs';
import rehypeBaseUrls from './plugins/rehype-base-urls.mjs';

const raw = process.env.BASE_PATH || '';
const basePath = raw && !raw.endsWith('/') ? raw + '/' : raw;

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: basePath || undefined,
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [
      rehypeWrapTables,
      [rehypeBaseUrls, { base: basePath }],
    ],
  },
});
