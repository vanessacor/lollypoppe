import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    updateDate: z.string().transform((str) => new Date(str)),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const glossaryCollection = defineCollection({
  schema: z.object({
    term: z.string(),
  }),
});

export const workCollection = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    company: z.string(),
    jobTitle: z.string(),
    location: z.string(),
    techSkills: z.array(z.string()).optional(),
    softSkills: z.array(z.string()).optional(),
    dates: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  work: workCollection,
};
