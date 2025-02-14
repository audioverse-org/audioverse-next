import { BibleBookDetailBookFragment } from '~src/containers/bible/__generated__/book';

import { getApiBibleBook } from './__generated__/getAnyBibleBook';
import getFcbhBook from './fcbh/getFcbhBook';
import { bookSchema } from './schemas/book';
import { transformBook } from './transforms/bookTransforms';

export default async function getAnyBibleBook(
	versionId: string,
	bookName: string,
): Promise<BibleBookDetailBookFragment | undefined> {
	const book = await getFcbhBook(versionId, bookName).catch(() => null);

	if (book) {
		return bookSchema.transform(transformBook).parse(book);
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
