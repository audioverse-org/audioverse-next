import {
	CollectionContentType,
	RecordingContentType,
} from '~src/__generated__/graphql';
import {
	BibleBookDetailChapterFullFragment,
	BibleBookDetailChapterPartialFragment,
} from '~src/containers/bible/__generated__/book';
import root from '~src/lib/routes';

import { IBibleBookChapter } from '../types';

function buildCanonicalPath(chapter: IBibleBookChapter): string {
	return root
		.lang('en')
		.bibles.versionId(chapter.version_id!)
		.bookName(chapter.book_name)
		.chapterNumber(chapter.number)
		.get();
}

export function transformChapterFull(
	chapter: IBibleBookChapter,
): BibleBookDetailChapterFullFragment {
	if (!chapter.version_id) {
		throw new Error('Version ID is required');
	}
	if (!chapter.version_name) {
		throw new Error('Version name is required');
	}
	if (!chapter.url) {
		throw new Error('URL is required');
	}
	if (!chapter.text) {
		throw new Error('Text is required');
	}

	const canonicalPath = buildCanonicalPath(chapter);
	const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;

	return {
		id: chapter.id,
		title: chapter.title,
		contentType: RecordingContentType.BibleChapter,
		canonicalPath,
		duration: chapter.duration,
		isDownloadAllowed: false,
		shareUrl: canonicalUrl,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: chapter.version_id,
			title: chapter.version_name,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: null,
		audioFiles: [
			{
				url: chapter.url,
				mimeType: 'audio/mpeg',
				filesize: 'unknown',
				duration: chapter.duration,
			},
		],
		videoFiles: [],
		videoStreams: [],
		transcript: { text: chapter.text },
		videoDownloads: [],
		audioDownloads: [],
		sequencePreviousRecording: null,
		sequenceNextRecording: null,
	};
}

export function transformChapterPartial(
	chapter: IBibleBookChapter,
): BibleBookDetailChapterPartialFragment {
	if (!chapter.version_id) {
		throw new Error('version_id is required');
	}
	if (!chapter.version_name) {
		throw new Error('version_name is required');
	}
	if (!chapter.url) {
		throw new Error('url is required');
	}

	const canonicalPath = buildCanonicalPath(chapter);

	return {
		id: chapter.id,
		title: chapter.title,
		canonicalPath,
		duration: chapter.duration,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: chapter.version_id,
			title: chapter.version_name,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: null,
		sequenceIndex: null,
		audioFiles: [
			{
				url: chapter.url,
				mimeType: 'audio/mpeg',
				filesize: 'unknown',
				duration: chapter.duration,
			},
		],
		videoFiles: [],
		videoStreams: [],
	};
}
