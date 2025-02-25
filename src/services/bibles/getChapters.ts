import { z } from 'zod';

import { BibleChapterDetailChapterPartialFragment } from '~src/containers/bible/__generated__/chapter';
import root from '~src/lib/routes';

import {
	getGraphqlChapters,
	searchBibleBooks,
} from './__generated__/getChapters';
import getFcbhBook from './fcbh/getFcbhBook';
import { chapterSchema } from './schemas/chapter';
import { transformChapterPartial } from './transforms/chapterTransforms';
import { parseChapterNumber, toTitleCase } from './utils';

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

	const chapters = result?.recordings.nodes;

	if (chapters && chapters.length > 0) {
		return chapters.map((chapter) => {
			const chapterNumber = parseChapterNumber(chapter.title);

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
		});
	}

	return chapters ?? undefined;
}
