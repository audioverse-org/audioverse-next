import { BibleChapterDetailChapterPartialFragment } from '~src/containers/bible/chapter/__generated__/index';
import root from '~src/lib/routes';

import { getGraphqlChapters } from './__generated__/getChapters';
import getFcbhBook from './fcbh/getFcbhBook';
import getBookMeta from './getBookMeta';
import { getGraphqlBookId } from './graphql/getGraphqlBookId';
import { transformChapterPartial } from './transforms/chapterTransforms';
import { parseChapterNumber } from './utils';

async function doGetChapters(
	versionId: string,
	bookId: string,
): Promise<BibleChapterDetailChapterPartialFragment[]> {
	const fcbhBook = await getFcbhBook(versionId, bookId).catch(() => null);

	if (fcbhBook) {
		return Promise.all(
			fcbhBook.chapters.map((chapter) =>
				transformChapterPartial(fcbhBook, chapter),
			),
		);
	}

	const bookMeta = getBookMeta(bookId);

	if (!bookMeta) {
		throw new Error(`Book not found: ${bookId}`);
	}

	const sequenceId = await getGraphqlBookId(versionId, bookMeta.fullName);

	if (!sequenceId) {
		throw new Error(`Sequence not found for book: ${bookId}`);
	}

	const result = await getGraphqlChapters({
		sequenceId,
	}).catch((e) => {
		console.error(e);
		throw new Error(
			`Error fetching chapters for book ${bookId} in version ${versionId}`,
		);
	});

	const chapters = result?.recordings.nodes;

	if (!chapters?.length) {
		throw new Error(
			`No chapters found for book ${bookId} in version ${versionId}`,
		);
	}

	return chapters.map((chapter): BibleChapterDetailChapterPartialFragment => {
		const chapterNumber = parseChapterNumber(chapter.title);

		const canonicalPath = root
			.lang('en')
			.bibles.versionId(versionId)
			.fcbhId(bookId)
			.chapterNumber(chapterNumber)
			.get();

		return {
			...chapter,
			canonicalPath,
		};
	});
}

export default async function getChapters(
	versionId: string,
	bookId: string,
): Promise<BibleChapterDetailChapterPartialFragment[] | undefined> {
	const chapters = await doGetChapters(versionId, bookId);

	return chapters.sort((a, b) => {
		const aNumber = parseChapterNumber(a.title);
		const bNumber = parseChapterNumber(b.title);
		return aNumber - bNumber;
	});
}
