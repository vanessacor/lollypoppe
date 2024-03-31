import { getCollection } from "astro:content";

type Tags = string[];
export async function getTags(): Promise<Tags> {
  const post = await getCollection("blog");
  const tags = [...new Set(post.map((post) => post.data.tags).flat())];
  return tags;
}
