import { z } from 'zod';

import { BibleBookDetailChapterPartialFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBookChapters } from './__generated__/getAnyBibleBookChapters';
import getFcbhBible from './getFcbhBible';
import { chapterPartialSchema } from './schemas/chapterPartial';

const chaptersSchema = z.array(chapterPartialSchema);

export default async function getAnyBibleBookChapters(
	versionId: string,
	bookName: string,
): Promise<BibleBookDetailChapterPartialFragment[] | undefined> {
	const fcbhBible = getFcbhBible(versionId);

	if (fcbhBible) {
		const book = fcbhBible.books.find((b) => b.name === bookName);

		if (!book) {
			throw new Error(`Book not found: ${bookName}`);
		}

		if (!book.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${bookName}`);
		}

		return chaptersSchema.parse(book.chapters_full);
	}

	const result = await getApiBibleBookChapters({
		collectionId: Number(versionId),
		bookSearch: bookName,
	}).catch((e) => {
		console.error(e);
		return null;
	});

	return result?.sequences.nodes?.[0]?.recordings.nodes ?? undefined;
}
