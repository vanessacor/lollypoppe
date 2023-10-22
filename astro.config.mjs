import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { externalLinks } from "./src/integration/rehype/externalLinks";

const rehypePlugins = [externalLinks];
export default defineConfig({
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
    rehypePlugins,
  },
});
