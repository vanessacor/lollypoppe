import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    updateDate: z.string().transform((str) => new Date(str)),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};

export const glossaryCollection = defineCollection({
  schema: z.object({
    term: z.string(),
  }),
});

const workCollection = defineCollection({
  schema: z.object({
    id: z.string(),
    company: z.string(),
    jobTitle: z.string(),
    location: z.string(),
    dates: z.array(z.string()),
  }),
});
