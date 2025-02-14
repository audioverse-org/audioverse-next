import { z } from 'zod';

import { BibleBookDetailChapterPartialFragment } from '~src/containers/bible/__generated__/book';

import {
	getApiBibleBookChapters,
	searchBibleBooks,
} from './__generated__/getAnyBibleBookChapters';
import getFcbhBook from './fcbh/getFcbhBook';
import { chapterSchema } from './schemas/chapter';
import { transformChapterPartial } from './transforms/chapterTransforms';

export default async function getAnyBibleBookChapters(
	versionId: string,
	bookName: string,
): Promise<BibleBookDetailChapterPartialFragment[] | undefined> {
	const fcbhBook = await getFcbhBook(versionId, bookName).catch(() => null);

	if (fcbhBook) {
		if (!fcbhBook.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${bookName}`);
		}

		return z
			.array(chapterSchema.transform(transformChapterPartial))
			.parse(fcbhBook.chapters_full);
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
