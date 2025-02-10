import { z } from 'zod';

import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

import { ApiBible } from '../getApiBible';
import { IBibleVersion } from '../types';

type SchemaType = z.ZodType<ApiBible, z.ZodTypeDef, IBibleVersion>;

export const versionSchema: SchemaType = z
	.object({
		id: z.string(),
		title: z.string(),
		abbreviation: z.string(),
		description: z.string().optional(),
		books: z.array(
			z.object({
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
			}),
		),
		sponsor: z.object({
			title: z.string(),
			website: z.string(),
		}),
	})
	.transform((val: IBibleVersion): ApiBible => {
		return {
			__typename: 'Collection',
			id: val.id,
			title: val.title,
			description: val.description || '',
			sponsor: {
				__typename: 'Sponsor',
				title: val.sponsor.title,
				website: val.sponsor.website,
			},
			sequences: {
				nodes: val.books.map((book) => ({
					__typename: 'Sequence',
					id: book.book_id,
					title: book.name,
					contentType: SequenceContentType.BibleBook,
					recordings: {
						nodes: book.chapters_full.map((chapter) => ({
							__typename: 'Recording',
							id: chapter.id,
							title: chapter.title,
							contentType: RecordingContentType.BibleChapter,
							duration: chapter.duration,
						})),
					},
				})),
			},
		};
	});

export type Version = z.infer<typeof versionSchema>;
