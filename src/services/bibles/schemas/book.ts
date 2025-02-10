import { z } from 'zod';

import { BibleBookDetailBookFragment } from '~src/containers/bible/__generated__/book';

import { IBibleBook } from '../types';

type SchemaType = z.ZodType<
	BibleBookDetailBookFragment,
	z.ZodTypeDef,
	IBibleBook
>;

export const bookSchema: SchemaType = z
	.object({
		book_id: z.string(),
		name: z.string(),
		name_short: z.string(),
		chapters: z.array(z.number()),
		book_seq: z.string(),
		testament: z.string(),
		bible: z.object({
			abbreviation: z.string(),
		}),
		chapters_full: z.array(
			z.object({
				id: z.string(),
				title: z.string(),
				number: z.number(),
				url: z.string(),
				duration: z.number(),
				text: z.string(),
				book_name: z.string(),
			}),
		),
	})
	.transform((val: IBibleBook): BibleBookDetailBookFragment => {
		return {
			id: val.book_id,
			title: val.name,
		};
	});

export type Book = z.infer<typeof bookSchema>;
