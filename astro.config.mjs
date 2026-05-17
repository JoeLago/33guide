import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeWrapTables from './plugins/rehype-wrap-tables.mjs';

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
});
