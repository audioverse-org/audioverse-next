import {
	CollectionContentType,
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import {
	BibleChapterDetailChapterFullFragment,
	BibleChapterDetailChapterPartialFragment,
} from '~src/containers/bible/chapter/__generated__/index';
import root from '~src/lib/routes';

import { FCBH_VERSIONS } from '../constants';
import { fetchFcbhChapterMediaUrl } from '../fcbh/fetchFcbhChapterMediaUrl';
import { getFcbhFilesetId } from '../fcbh/getFcbhFilesetId';
import getBookMeta from '../getBookMeta';
import { IBibleBook } from '../types';

function getCanonicalPath(book: IBibleBook, chapter: number): string {
	const meta = getBookMeta(book.book_id);

	if (!meta) {
		throw new Error('Book meta not found');
	}

	const version = FCBH_VERSIONS.find(
		(v) => v.abbreviation === book.bible.abbreviation,
	);

	if (!version) {
		throw new Error('Version not found');
	}

	return root
		.lang('en')
		.bibles.versionId(version.id)
		.fcbhId(meta.fcbhId)
		.chapterNumber(chapter)
		.get();
}

function getBookName(book: IBibleBook): string {
	return book.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function getVersion(book: IBibleBook) {
	const version = FCBH_VERSIONS.find(
		(v) => v.abbreviation === book.bible.abbreviation,
	);

	if (!version) {
		throw new Error('Version not found');
	}

	return version;
}

function getChapterId(book: IBibleBook, chapter: number) {
	const version = getVersion(book);
	const filesetId = getFcbhFilesetId(version.id, book.testament);

	return `${filesetId}/${book.book_id}/${chapter}`;
}

async function getAudioFiles(book: IBibleBook, chapter: number) {
	const version = getVersion(book);
	const filesetId = getFcbhFilesetId(version.id, book.testament);
	const mediaUrl = await fetchFcbhChapterMediaUrl(
		filesetId,
		book.book_id,
		chapter,
	);

	return [
		{ url: mediaUrl, duration: 0, mimeType: 'audio/mpeg', filesize: 'unknown' },
	];
}

export async function transformChapterFull(
	book: IBibleBook,
	chapter: number,
): Promise<BibleChapterDetailChapterFullFragment> {
	const canonicalPath = getCanonicalPath(book, chapter);
	const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;
	const bookName = getBookName(book);
	const version = getVersion(book);

	return {
		id: getChapterId(book, chapter),
		title: `${bookName} ${chapter}`,
		contentType: RecordingContentType.BibleChapter,
		canonicalPath,
		duration: 0,
		isDownloadAllowed: false,
		shareUrl: canonicalUrl,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: version.id,
			title: version.title,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: {
			id: '',
			title: bookName,
			contentType: SequenceContentType.BibleBook,
		},
		audioFiles: await getAudioFiles(book, chapter),
		videoFiles: [],
		videoStreams: [],
		videoDownloads: [],
		audioDownloads: [],
		sequencePreviousRecording: null,
		sequenceNextRecording: null,
	};
}

export async function transformChapterPartial(
	book: IBibleBook,
	chapter: number,
): Promise<BibleChapterDetailChapterPartialFragment> {
	const canonicalPath = getCanonicalPath(book, chapter);
	const version = getVersion(book);

	return {
		id: getChapterId(book, chapter),
		title: `${getBookName(book)} ${chapter}`,
		canonicalPath,
		duration: 0,
		recordingContentType: RecordingContentType.BibleChapter,
		collection: {
			id: version.id,
			title: version.title,
			contentType: CollectionContentType.BibleVersion,
		},
		speakers: [],
		sponsor: { title: 'Faith Comes By Hearing' },
		sequence: {
			id: '',
			title: getBookName(book),
			contentType: SequenceContentType.BibleBook,
			recordings: {
				aggregate: {
					count: book.chapters.length,
				},
			},
		},
		sequenceIndex: null,
		audioFiles: await getAudioFiles(book, chapter),
		videoFiles: [],
		videoStreams: [],
	};
}
