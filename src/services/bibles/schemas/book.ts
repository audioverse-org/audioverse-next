import { z } from 'zod';

import { IBibleBook } from '../types';
import { chapterSchema } from './chapter';

export const bookSchema: z.ZodType<IBibleBook> = z.object({
	book_id: z.string(),
	name: z.string(),
	name_short: z.string(),
	chapters: z.array(z.number()),
	book_seq: z.string(),
	testament: z.enum(['OT', 'NT']),
	bible: z.object({
		abbreviation: z.string(),
	}),
	chapters_full: z.array(chapterSchema),
});
