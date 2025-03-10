import { z } from 'zod';

import { IBibleBookChapter } from '../types';

export const chapterSchema: z.ZodType<IBibleBookChapter> = z.object({
	id: z.string(),
	title: z.string(),
	number: z.number(),
	url: z.string().optional(),
	duration: z.number(),
	text: z.string().optional(),
	book_name: z.string(),
	version_id: z.string().optional(),
	version_name: z.string().optional(),
});
