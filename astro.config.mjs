import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { externalLinks } from "./src/integration/rehype/externalLinks";
import solidJs from "@astrojs/solid-js";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["one-dark-pro"],
    }),
    mdx(),
    sitemap(),
    solidJs(),
  ],
  markdown: {
    rehypePlugins: [externalLinks],
  },
});
