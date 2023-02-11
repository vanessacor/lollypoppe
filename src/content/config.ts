import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    updateDate: z.string().transform((str) => new Date(str)),
  }),
});
const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    link: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    gitHubLink: z.string(),
    deploy: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
