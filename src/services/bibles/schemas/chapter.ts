import { z } from 'zod';

import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import { BibleBookDetailChapterFullFragment } from '~src/containers/bible/__generated__/book';
import root from '~src/lib/routes';

import { IBibleBookChapter } from '../types';

type SchemaType = z.ZodType<
	BibleBookDetailChapterFullFragment,
	z.ZodTypeDef,
	IBibleBookChapter
>;

export const chapterSchema: SchemaType = z
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
	.transform((val: IBibleBookChapter): BibleBookDetailChapterFullFragment => {
		if (!val.version_id) {
			throw new Error('Version ID is required');
		}

		if (!val.version_name) {
			throw new Error('Version name is required');
		}

		const canonicalPath = root
			.lang('en')
			.bibles.versionId(val.version_id)
			.bookName(val.book_name)
			.chapterNumber(val.number)
			.get();

		const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;

		return {
			id: val.id,
			title: val.title,
			contentType: RecordingContentType.BibleChapter,
			canonicalPath,
			duration: val.duration,
			isDownloadAllowed: false,
			shareUrl: canonicalUrl,
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
			transcript: {
				text: val.text,
			},
			videoDownloads: [],
			audioDownloads: [],
			sequencePreviousRecording: null,
			sequenceNextRecording: null,
		};
	});

export type Chapter = z.infer<typeof chapterSchema>;
