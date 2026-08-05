import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      // --- Core / SEO ---
      title: z.string(),
      slug: z.string(),
      targetKeyword: z.string(),
      metaDescription: z.string().max(160, 'Keep meta descriptions under 160 characters'),

      // --- Media ---
      heroImage: image(),
      heroImageAlt: z.string().optional(),
      videoEmbedUrl: z.string().url().optional(),

      // --- Copy ---
      intro: z.string(),
      ingredients: z.array(z.string()).min(1),
      steps: z.array(z.string()).min(1),
      whyItWorks: z.array(z.string()).default([]),
      substitutions: z.array(z.string()).default([]),
      tips: z.array(z.string()).default([]),

      // --- Nutrition (optional) ---
      nutrition: z
        .object({
          calories: z.string().optional(),
          protein: z.string().optional(),
          fat: z.string().optional(),
          carbs: z.string().optional(),
          fiber: z.string().optional(),
          sugar: z.string().optional(),
        })
        .optional(),

      // --- Monetization ---
      amazonUrl: z.string().url(),
      amazonCta: z.string().default('Get the kitchen tool that makes this easy'),

      // --- Meta ---
      datePublished: z.coerce.date(),
      category: z.string(),
      prepTime: z.string(),
      cookTime: z.string(),
      servings: z.union([z.string(), z.number()]),
    }),
});

export const collections = { recipes };
