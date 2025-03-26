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
import { IBBBook } from '../types';

function getCanonicalPath(
	versionId: string,
	book: IBBBook,
	chapter: number,
): string {
	const meta = getBookMeta(book.book_id);

	if (!meta) {
		throw new Error('Book meta not found');
	}

	const version = FCBH_VERSIONS.find((v) => v.id === versionId);

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

function getBookName(book: IBBBook): string {
	return book.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function getVersion(versionId: string) {
	const version = FCBH_VERSIONS.find((v) => v.id === versionId);

	if (!version) {
		throw new Error('Version not found');
	}

	return version;
}

function getChapterId(versionId: string, book: IBBBook, chapter: number) {
	const filesetId = getFcbhFilesetId(versionId, book.testament);

	return `${filesetId}/${book.book_id}/${chapter}`;
}

interface AudioFile {
	url: string;
	logUrl: string;
	duration: number;
	mimeType: string;
	filesize: string;
}

async function getAudioFiles(
	versionId: string,
	internalVersionId: number,
	book: IBBBook,
	chapter: number,
): Promise<AudioFile[]> {
	const filesetId = getFcbhFilesetId(versionId, book.testament);
	const mediaUrl = await fetchFcbhChapterMediaUrl(
		filesetId,
		book.book_id,
		chapter,
	);

	return [
		{
			url: mediaUrl,
			logUrl: `/en/download/bible/${internalVersionId}/${book.book_id}/${chapter}`,
			duration: 0,
			mimeType: 'audio/mpeg',
			filesize: 'unknown',
		},
	];
}

export async function transformChapterFull(
	versionId: string,
	book: IBBBook,
	chapter: number,
): Promise<
	BibleChapterDetailChapterFullFragment & { audioFiles: AudioFile[] }
> {
	const canonicalPath = getCanonicalPath(versionId, book, chapter);
	const canonicalUrl = `https://www.audioverse.org${canonicalPath}`;
	const bookName = getBookName(book);
	const version = getVersion(versionId);

	const previousPath =
		chapter > 1 ? getCanonicalPath(versionId, book, chapter - 1) : null;
	const nextPath =
		chapter < book.chapters.length
			? getCanonicalPath(versionId, book, chapter + 1)
			: null;

	return {
		id: getChapterId(versionId, book, chapter),
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
		audioFiles: await getAudioFiles(
			version.id,
			version.internalId,
			book,
			chapter,
		),
		videoFiles: [],
		videoStreams: [],
		videoDownloads: [],
		audioDownloads: [],
		sequencePreviousRecording: previousPath
			? {
					canonicalPath: previousPath,
				}
			: null,
		sequenceNextRecording: nextPath
			? {
					canonicalPath: nextPath,
				}
			: null,
	};
}

export async function transformChapterPartial(
	versionId: string,
	book: IBBBook,
	chapter: number,
): Promise<
	BibleChapterDetailChapterPartialFragment & { audioFiles: AudioFile[] }
> {
	const canonicalPath = getCanonicalPath(versionId, book, chapter);
	const version = getVersion(versionId);

	return {
		id: getChapterId(versionId, book, chapter),
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
		audioFiles: await getAudioFiles(
			version.id,
			version.internalId,
			book,
			chapter,
		),
		videoFiles: [],
		videoStreams: [],
	};
}
