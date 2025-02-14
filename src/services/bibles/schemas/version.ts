import { z } from 'zod';

import { IBibleVersion } from '../types';
import { bookSchema } from './book';

export const versionSchema: z.ZodType<IBibleVersion> = z.object({
	id: z.string(),
	title: z.string(),
	abbreviation: z.string(),
	description: z.string().optional(),
	books: z.array(bookSchema),
	sponsor: z.object({
		title: z.string(),
		website: z.string(),
	}),
});
