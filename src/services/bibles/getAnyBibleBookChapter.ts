import { BibleBookDetailChapterFullFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBookChapter } from './__generated__/getAnyBibleBookChapter';
import getFcbhBible from './getFcbhBible';
import { chapterSchema } from './schemas/chapter';

export default async function getAnyBibleBookChapter(
	versionId: string,
	bookName: string,
	chapterNumber: string,
): Promise<BibleBookDetailChapterFullFragment | undefined> {
	const fcbhBible = getFcbhBible(versionId);

	if (fcbhBible) {
		const book = fcbhBible.books.find((b) => b.name === bookName);

		if (!book) {
			throw new Error(`Book not found: ${bookName}`);
		}

		if (!book.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${bookName}`);
		}

		const chapter = book.chapters_full.find(
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
