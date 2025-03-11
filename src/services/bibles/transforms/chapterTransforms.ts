import {
	CollectionContentType,
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import {
	BibleChapterDetailChapterFullFragment,
	BibleChapterDetailChapterPartialFragment,
} from '~src/containers/bible/__generated__/chapter';
import root from '~src/lib/routes';

import getBookMeta from '../getBookName';
import { IBibleBook } from '../types';

function getCanonicalPath(book: IBibleBook, chapter: number): string {
	const meta = getBookMeta(book.book_id);

	if (!meta) {
		throw new Error('Book meta not found');
	}

	const versionId = book.book_id.split('/')[0];

	return root
		.lang('en')
		.bibles.versionId(versionId)
		.fcbhId(meta.fcbhId)
		.chapterNumber(chapter)
		.get();
}

function getBookName(book: IBibleBook): string {
	return book.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function transformChapterFull(
	book: IBibleBook,
	chapter: number,
): BibleChapterDetailChapterFullFragment {
	const canonicalPath = getCanonicalPath(book, chapter);
	const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;
	const bookName = getBookName(book);

	return {
		id: `${book.book_id}/${chapter}`,
		title: `${bookName} ${chapter}`,
		contentType: RecordingContentType.BibleChapter,
		canonicalPath,
		duration: 0,
		isDownloadAllowed: false,
		shareUrl: canonicalUrl,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: book.bible.abbreviation,
			title: book.bible.abbreviation,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: {
			id: '',
			title: bookName,
			contentType: SequenceContentType.BibleBook,
		},
		audioFiles: [],
		videoFiles: [],
		videoStreams: [],
		transcript: { text: '' },
		videoDownloads: [],
		audioDownloads: [],
		sequencePreviousRecording: null,
		sequenceNextRecording: null,
	};
}

export function transformChapterPartial(
	book: IBibleBook,
	chapter: number,
): BibleChapterDetailChapterPartialFragment {
	const canonicalPath = getCanonicalPath(book, chapter);

	return {
		id: `${book.book_id}/${chapter}`,
		title: `${getBookName(book)} ${chapter}`,
		canonicalPath,
		duration: 0,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: book.bible.abbreviation,
			title: book.bible.abbreviation,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: null,
		sequenceIndex: null,
		audioFiles: [],
		videoFiles: [],
		videoStreams: [],
	};
}
