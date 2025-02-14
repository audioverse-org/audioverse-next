import { BibleBookDetailChapterFullFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBookChapter } from './__generated__/getAnyBibleBookChapter';
import getFcbhChapter from './fcbh/getFcbhChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { chapterSchema } from './schemas/chapter';
import { transformChapterFull } from './transforms/chapterTransforms';

export default async function getAnyBibleBookChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
): Promise<BibleBookDetailChapterFullFragment | undefined> {
	const fcbhChapter = await getFcbhChapter(versionId, bookName, chapterNumber);

	if (fcbhChapter) {
		return chapterSchema.transform(transformChapterFull).parse({
			...fcbhChapter,
			text: await fetchChapterText(bookName, chapterNumber),
		});
	}

	const result = await getApiBibleBookChapter({
		collectionId: Number(versionId),
		titleSearch: `"${bookName} ${chapterNumber}"`,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	return result?.recordings.nodes?.[0];
}
