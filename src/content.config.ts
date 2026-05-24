import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutors = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/tutors' }),
  schema: z.object({
    name: z.string(),
    fullName: z.string(),
    monogram: z.string().length(2),
    school: z.string(),
    classYear: z.string(),
    major: z.string().optional(),
    subjects: z.array(z.string()),
    serviceSlugs: z.array(z.enum(['ap', 'sat', 'act', 'college-counseling'])),
    hourlyRate: z.number(),
    calLinks: z.object({
      consult: z.string(),
      firstLesson: z.string(),
    }),
    cardGradient: z.enum(['lime', 'tangerine', 'plum', 'ink']),
    scoreHighlights: z.array(z.string()).optional(),
    headline: z.string(),
  }),
});

export const collections = { tutors };
