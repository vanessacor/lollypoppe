import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    updateDate: z.string().transform((str) => new Date(str)),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const workCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    id: z.string(),
    company: z.string(),
    jobTitle: z.string(),
    location: z.string(),
    skills: z.array(z.string()),
    dates: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  work: workCollection,
};
