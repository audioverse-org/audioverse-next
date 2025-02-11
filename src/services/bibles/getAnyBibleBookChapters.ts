import { z } from 'zod';

import { BibleBookDetailChapterPartialFragment } from '~src/containers/bible/__generated__/book';

import {
	getApiBibleBookChapters,
	searchBibleBooks,
} from './__generated__/getAnyBibleBookChapters';
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

	const { sequences } = await searchBibleBooks({
		collectionId: Number(versionId),
		bookSearch: bookName,
	}).catch((e) => {
		console.error(e);
		return { sequences: null };
	});

	const sequence = sequences?.nodes?.find((s) => s.title === bookName);

	if (!sequence) {
		throw new Error(`Sequence not found for book: ${bookName}`);
	}

	const result = await getApiBibleBookChapters({
		sequenceId: sequence.id,
	}).catch((e) => {
		console.error(e);
		return null;
	});

	return result?.recordings.nodes ?? undefined;
}
