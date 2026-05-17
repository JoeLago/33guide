import { visit } from 'unist-util-visit';

export default function rehypeBaseUrls(options = {}) {
  const base = options.base || '';
  if (!base) return () => {};

  const prefix = base.endsWith('/') ? base : base + '/';

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src?.startsWith('/')) {
        node.properties.src = prefix + node.properties.src.slice(1);
      }
    });

    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (node.name !== 'img') return;
      const srcAttr = node.attributes?.find(a => a.type === 'mdxJsxAttribute' && a.name === 'src');
      if (srcAttr && typeof srcAttr.value === 'string' && srcAttr.value.startsWith('/')) {
        srcAttr.value = prefix + srcAttr.value.slice(1);
      }
    });
  };
}
