import { BibleBookDetailBookFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBook } from './__generated__/getAnyBibleBook';
import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getFcbhBible from './fcbh/getFcbhBible';
import { bookSchema } from './schemas/book';

export default async function getAnyBibleBook(
	versionId: string,
	bookName: string,
): Promise<BibleBookDetailBookFragment | undefined> {
	const fcbhBible = getFcbhBible(versionId);

	if (fcbhBible) {
		const book = fcbhBible.books.find(
			(b) => b.name.toLowerCase() === bookName.toLowerCase(),
		);

		if (!book) {
			throw new Error(`Book ${bookName} not found in ${versionId}`);
		}

		book.chapters_full = await fetchFcbhChapters(
			versionId,
			fcbhBible.title,
			book.testament,
			book.book_id,
		);

		return bookSchema.parse(book);
	}

	const result = await getApiBibleBook({
		collectionId: Number(versionId),
		bookSearch: `"${bookName}"`,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	return result?.sequences.nodes?.[0];
}
