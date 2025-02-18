import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/__generated__/chapter';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhChapter from './fcbh/getFcbhChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { chapterSchema } from './schemas/chapter';
import { transformChapterFull } from './transforms/chapterTransforms';

export default async function getChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
): Promise<BibleChapterDetailChapterFullFragment | undefined> {
	const fcbhChapter = await getFcbhChapter(
		versionId,
		bookName,
		chapterNumber,
	).catch(() => null);

	if (fcbhChapter) {
		return chapterSchema.transform(transformChapterFull).parse({
			...fcbhChapter,
			text: await fetchChapterText(bookName, chapterNumber),
		});
	}

	const result = await getGraphqlChapter({
		collectionId: Number(versionId),
		titleSearch: `"${bookName} ${chapterNumber}"`,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	return result?.recordings.nodes?.[0];
}
