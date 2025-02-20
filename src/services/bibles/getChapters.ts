import { z } from 'zod';

import { BibleChapterDetailChapterPartialFragment } from '~src/containers/bible/__generated__/chapter';

import {
	getGraphqlChapters,
	searchBibleBooks,
} from './__generated__/getChapters';
import getFcbhBook from './fcbh/getFcbhBook';
import { chapterSchema } from './schemas/chapter';
import { transformChapterPartial } from './transforms/chapterTransforms';

export default async function getChapters(
	versionId: string,
	bookName: string,
): Promise<BibleChapterDetailChapterPartialFragment[] | undefined> {
	// Decode the book name since it comes from the URL
	const decodedBookName = decodeURIComponent(bookName);

	const fcbhBook = await getFcbhBook(versionId, decodedBookName).catch(
		() => null,
	);

	if (fcbhBook) {
		if (!fcbhBook.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${decodedBookName}`);
		}

		return z
			.array(chapterSchema.transform(transformChapterPartial))
			.parse(fcbhBook.chapters_full);
	}

	const { sequences } = await searchBibleBooks({
		collectionId: Number(versionId),
		bookSearch: decodedBookName,
	}).catch((e) => {
		console.error(e);
		return { sequences: null };
	});

	const sequence = sequences?.nodes?.find((s) => s.title === decodedBookName);

	if (!sequence) {
		throw new Error(`Sequence not found for book: ${decodedBookName}`);
	}

	const result = await getGraphqlChapters({
		sequenceId: sequence.id,
	}).catch((e) => {
		console.error(e);
		return null;
	});

	return result?.recordings.nodes ?? undefined;
}
