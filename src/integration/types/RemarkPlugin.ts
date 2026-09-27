import type { Root } from "mdast";

import type { VFile } from "./VFile";

// eslint-disable-next-line no-unused-vars
export type RemarkPlugin = (tree: Root, file: VFile) => void;
