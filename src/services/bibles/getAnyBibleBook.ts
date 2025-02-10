import { BibleBookDetailBookFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBook } from './__generated__/getAnyBibleBook';
import getFcbhBible from './getFcbhBible';
import { bookSchema } from './schemas/book';

export default async function getAnyBibleBook(
	versionId: string,
	bookName: string,
): Promise<BibleBookDetailBookFragment | undefined> {
	const fcbhBible = getFcbhBible(versionId);

	if (fcbhBible) {
		return bookSchema.parse(fcbhBible.books.find((b) => b.name === bookName));
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
