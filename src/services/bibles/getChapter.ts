import { TeaseRecordingFragment } from '~src/components/molecules/__generated__/teaseRecording';
import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/chapter/__generated__/index';
import root from '~src/lib/routes';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhBook from './fcbh/getFcbhBook';
import getBookMeta from './getBookMeta';
import getRelatedTeachings from './getRelatedTeachings';
import fetchChapterText from './graphql/fetchChapterText';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';
import { transformChapterFull } from './transforms/chapterTransforms';

type ChapterWithTranscript = BibleChapterDetailChapterFullFragment & {
	transcript?: { text: string };
	relatedList?: { related: TeaseRecordingFragment[] };
};

export default async function getChapter(
	versionId: string,
	bookId: string,
	chapterNumber: number,
): Promise<ChapterWithTranscript> {
	const fcbhBook = await getFcbhBook(versionId, bookId).catch(() => null);

	if (fcbhBook) {
		const full = await transformChapterFull(versionId, fcbhBook, chapterNumber);

		return {
			...full,
			transcript: {
				text: await fetchChapterText(bookId, chapterNumber),
			},
			relatedList: {
				related: await getRelatedTeachings(bookId, chapterNumber),
			},
		};
	}

	const bookMeta = getBookMeta(bookId);

	if (!bookMeta) {
		throw new Error(`Book not found: ${bookId}`);
	}

	const chapterId = await getGraphqlChapterId(versionId, bookId, chapterNumber);

	if (!chapterId) {
		throw new Error(`Chapter not found: ${bookId} ${chapterNumber}`);
	}

	const result = await getGraphqlChapter({
		chapterId,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	const chapter = result?.recording;

	if (!chapter) {
		throw new Error(`Chapter not found: ${bookId} ${chapterNumber}`);
	}

	function getCanonicalPath(bookId: string, chapterNumber: number) {
		return root
			.lang('en')
			.bibles.versionId(versionId)
			.fcbhId(bookId)
			.chapterNumber(chapterNumber)
			.get();
	}

	const canonicalPath = getCanonicalPath(bookId, chapterNumber);
	const previousPath =
		chapterNumber > 1 ? getCanonicalPath(bookId, chapterNumber - 1) : null;
	const nextPath = chapter.sequenceNextRecording
		? getCanonicalPath(bookId, chapterNumber + 1)
		: null;

	return {
		...chapter,
		canonicalPath,
		shareUrl: `https://www.audioverse.org${chapter.canonicalPath}`,
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
		relatedList: {
			related: await getRelatedTeachings(bookId, chapterNumber),
		},
	};
}
