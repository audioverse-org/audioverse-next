import { BibleChapterDetailChapterFullFragment } from '~src/containers/bible/__generated__/chapter';
import root from '~src/lib/routes';

import { getGraphqlChapter } from './__generated__/getChapter';
import getFcbhChapter from './fcbh/getFcbhChapter';
import fetchChapterText from './graphql/fetchChapterText';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';
import { chapterSchema } from './schemas/chapter';
import { transformChapterFull } from './transforms/chapterTransforms';
import { toTitleCase } from './utils';

export default async function getChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
): Promise<BibleChapterDetailChapterFullFragment> {
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

	const chapterId = getGraphqlChapterId(
		versionId,
		formattedName,
		chapterNumber,
	);

	if (!chapterId) {
		throw new Error(`Chapter not found: ${formattedName} ${chapterNumber}`);
	}

	const result = await getGraphqlChapter({
		chapterId,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	const chapter = result?.recording;

	if (!chapter) {
		throw new Error(`Chapter not found: ${formattedName} ${chapterNumber}`);
	}

	const canonicalPath = root
		.lang('en')
		.bibles.versionId(versionId)
		.bookName(formattedName)
		.chapterNumber(chapterNumber)
		.get();

	return {
		...chapter,
		canonicalPath,
	};
}
