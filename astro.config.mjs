import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { externalLinks } from "./src/integration/rehype/externalLinks";
import solidJs from "@astrojs/solid-js";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  // v7 defaults to "jsx", which strips whitespace between inline elements in our templates
  compressHTML: true,
  integrations: [
    expressiveCode({
      themes: ["one-dark-pro"],
    }),
    mdx(),
    sitemap(),
    solidJs(),
  ],
  markdown: {
    // unified keeps the remark/rehype pipeline that externalLinks and expressive-code rely on
    processor: unified({ rehypePlugins: [externalLinks] }),
  },
});
