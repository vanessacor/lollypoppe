import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "../types/RemarkPlugin";
import type { VFile } from "../types/VFile";

// Credit to Andre Torgal for the original code at https://github.com/andrezero/andretorgal-site/blob/f62caf72d80a06f1f1b970f7e47fc9769fe9d0d4/src/integration/rehype/externalLinks.ts

type Link = {
  url: string;
  label: string;
};

type Links = {
  internal: Link[];
  external: Link[];
};

type LinkNode = {
  tagName: string;
  properties?: {
    href?: string;
    rel?: string;
    "data-external"?: string;
    "data-type"?: string | undefined;
    target?: string;
  };
};

export function externalLinks(): RemarkPlugin {
  return function (tree: Root, file: VFile): void {
    const links: Links = { internal: [], external: [] };

    visit(tree, "element", (node: LinkNode) => {
      if (
        node.tagName === "a" &&
        node.properties &&
        typeof node.properties.href === "string"
      ) {
        const url = node.properties.href;
        const label = toString(node);
        console.log(node);
        const isAbsolute = /^[a-z]+:/.test(url) || url.startsWith("//");
        if (isAbsolute) {
          node.properties.rel = "nooener";
          node.properties["data-external"] = "";
          links.external.push({ url, label });
        } else {
          const base = url.split("/")[1];
          node.properties["data-type"] = base;
          links.internal.push({ url, label });
        }
      }
    });

    const { frontmatter } = file.data.astro;
    frontmatter.links = links;
  };
}
