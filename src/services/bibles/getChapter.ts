import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/__generated__/chapter';
import root from '~src/lib/routes';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhChapter from './fcbh/getFcbhChapter';
import getBookMeta from './getBookName';
import fetchChapterText from './graphql/fetchChapterText';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';
import { chapterSchema } from './schemas/chapter';
import { transformChapterFull } from './transforms/chapterTransforms';

export default async function getChapter(
	versionId: string,
	bookId: string,
	chapterNumber: number,
): Promise<BibleChapterDetailChapterFullFragment> {
	const fcbhChapter = await getFcbhChapter(
		versionId,
		bookId,
		chapterNumber,
	).catch(() => null);

	if (fcbhChapter) {
		return chapterSchema.transform(transformChapterFull).parse({
			...fcbhChapter,
			text: await fetchChapterText(bookId, chapterNumber),
		});
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
