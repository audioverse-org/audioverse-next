import { BibleBookDetailChapterFullFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBookChapter } from './__generated__/getAnyBibleBookChapter';
import getFcbhBook from './fcbh/getFcbhBook';
import { chapterSchema } from './schemas/chapter';

export default async function getAnyBibleBookChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
): Promise<BibleBookDetailChapterFullFragment | undefined> {
	const fcbhBook = await getFcbhBook(versionId, bookName);

	if (fcbhBook) {
		if (!fcbhBook.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${bookName}`);
		}

		const chapter = fcbhBook.chapters_full.find(
			(c) => c.number === Number(chapterNumber),
		);

		return chapterSchema.parse(chapter);
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
