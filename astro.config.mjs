import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { externalLinks } from "./src/integration/rehype/externalLinks";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), solidJs()],
  markdown: {
    rehypePlugins: [externalLinks],
    shikiConfig: {
      theme: "rose-pine-dawn",
      langs: ["js", "ts", "html", "bash", "json"],
      wrap: true
    }
  }
});