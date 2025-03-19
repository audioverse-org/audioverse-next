import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/chapter/__generated__/index';
import root from '~src/lib/routes';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhBook from './fcbh/getFcbhBook';
import getBookMeta from './getBookMeta';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';
import { transformChapterFull } from './transforms/chapterTransforms';

export default async function getChapter(
	versionId: string,
	bookId: string,
	chapterNumber: number,
): Promise<BibleChapterDetailChapterFullFragment> {
	const fcbhBook = await getFcbhBook(versionId, bookId).catch(() => null);

	if (fcbhBook) {
		return transformChapterFull(fcbhBook, chapterNumber);
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

	const canonicalPath = root
		.lang('en')
		.bibles.versionId(versionId)
		.fcbhId(bookId)
		.chapterNumber(chapterNumber)
		.get();

	return {
		...chapter,
		canonicalPath,
	};
}
