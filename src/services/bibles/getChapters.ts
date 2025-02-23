import { z } from 'zod';

import { BibleChapterDetailChapterPartialFragment } from '~src/containers/bible/__generated__/chapter';

import {
	getGraphqlChapters,
	searchBibleBooks,
} from './__generated__/getChapters';
import getFcbhBook from './fcbh/getFcbhBook';
import { chapterSchema } from './schemas/chapter';
import { transformChapterPartial } from './transforms/chapterTransforms';

// SOURCE: https://stackoverflow.com/a/196991
function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(text: string) =>
			text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
	);
}

export default async function getChapters(
	versionId: string,
	bookName: string,
): Promise<BibleChapterDetailChapterPartialFragment[] | undefined> {
	const formattedName = toTitleCase(bookName);
	const fcbhBook = await getFcbhBook(versionId, formattedName).catch(
		() => null,
	);

	if (fcbhBook) {
		if (!fcbhBook.chapters_full.length) {
			throw new Error(`Chapters not found for book: ${formattedName}`);
		}

		return z
			.array(chapterSchema.transform(transformChapterPartial))
			.parse(fcbhBook.chapters_full);
	}

	const { sequences } = await searchBibleBooks({
		collectionId: Number(versionId),
		bookSearch: formattedName,
	}).catch((e) => {
		console.error(e);
		return { sequences: null };
	});

	const sequence = sequences?.nodes?.find((s) => s.title === formattedName);

	if (!sequence) {
		throw new Error(`Sequence not found for book: ${formattedName}`);
	}

	const result = await getGraphqlChapters({
		sequenceId: sequence.id,
	}).catch((e) => {
		console.error(e);
		return null;
	});

	return result?.recordings.nodes ?? undefined;
}
