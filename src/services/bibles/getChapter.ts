import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/__generated__/chapter';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhChapter from './fcbh/getFcbhChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { chapterSchema } from './schemas/chapter';
import { transformChapterFull } from './transforms/chapterTransforms';
import { toTitleCase } from './utils';

export default async function getChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
): Promise<BibleChapterDetailChapterFullFragment | undefined> {
	const formattedName = toTitleCase(bookName);

	const fcbhChapter = await getFcbhChapter(
		versionId,
		formattedName,
		chapterNumber,
	).catch(() => null);

	if (fcbhChapter) {
		return chapterSchema.transform(transformChapterFull).parse({
			...fcbhChapter,
			text: await fetchChapterText(formattedName, chapterNumber),
		});
	}

	const result = await getGraphqlChapter({
		collectionId: Number(versionId),
		titleSearch: `"${formattedName} ${chapterNumber}"`,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	return result?.recordings.nodes?.[0];
}
