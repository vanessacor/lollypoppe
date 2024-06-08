import { getCollection } from "astro:content";

type Tags = string[];
export async function getTags(): Promise<Tags> {
  const postlist = (await getCollection("blog")).filter(
    (post) => !post.data.draft
  );

  // TODO once the tagsList gets bigger show count
  const tags = [...new Set(postlist.map((post) => post.data.tags).flat())];
  return tags;
}
