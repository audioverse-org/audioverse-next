import { BibleBookDetailChapterFullFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBookChapter } from './__generated__/getAnyBibleBookChapter';
import { fetchFcbhChapterMediaUrl } from './fcbh/fetchFcbhChapterMediaUrl';
import getFcbhBible from './fcbh/getFcbhBible';
import { chapterSchema } from './schemas/chapter';

export default async function getAnyBibleBookChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
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

		const url = await fetchFcbhChapterMediaUrl(
			versionId,
			book.testament,
			book.book_id,
			chapterNumber,
		);

		return chapterSchema.parse({ ...chapter, url });
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
