import { z } from 'zod';

import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import { BibleBookDetailChapterPartialFragment } from '~src/containers/bible/__generated__/book';
import root from '~src/lib/routes';

import { IBibleBookChapter } from '../types';

type SchemaType = z.ZodType<
	BibleBookDetailChapterPartialFragment,
	z.ZodTypeDef,
	IBibleBookChapter
>;

export const chapterPartialSchema: SchemaType = z
	.object({
		id: z.string(),
		title: z.string(),
		number: z.number(),
		url: z.string(),
		duration: z.number(),
		text: z.string(),
		book_name: z.string(),
		version_id: z.string().optional(),
		version_name: z.string().optional(),
	})
	.transform(
		(val: IBibleBookChapter): BibleBookDetailChapterPartialFragment => {
			if (!val.version_id) {
				throw new Error('version_id is required');
			}

			if (!val.version_name) {
				throw new Error('version_name is required');
			}

			const canonicalPath = root
				.lang('en')
				.bibles.versionId(val.version_id)
				.bookName(val.book_name)
				.chapterNumber(val.number)
				.get();

			return {
				id: val.id,
				title: val.title,
				canonicalPath,
				duration: val.duration,
				recordingContentType: RecordingContentType.BibleChapter,
				collection: {
					id: val.version_id,
					title: val.version_name,
					contentType: CollectionContentType.BibleVersion,
				},
				speakers: [],
				sponsor: {
					title: 'Faith Comes By Hearing',
				},
				sequence: null,
				sequenceIndex: null,
				audioFiles: [
					{
						url: val.url,
						mimeType: 'audio/mpeg',
						filesize: 'unknown',
						duration: val.duration,
					},
				],
				videoFiles: [],
				videoStreams: [],
			};
		},
	);

export type ChapterPartial = z.infer<typeof chapterPartialSchema>;
