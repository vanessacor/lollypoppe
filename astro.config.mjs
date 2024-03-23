import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { externalLinks } from "./src/integration/rehype/externalLinks";

const rehypePlugins = [externalLinks];
export default defineConfig({
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "rose-pine-dawn",
      langs: ["js", "ts", "html", "bash", "json"],
      wrap: true,
    },
    rehypePlugins,
  },
});
