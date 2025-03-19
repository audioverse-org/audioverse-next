import { BibleChapterDetailBookFragment } from '~src/containers/bible/chapter/__generated__/index';

import { getGraphqlBook } from './__generated__/getBook';
import getFcbhBook from './fcbh/getFcbhBook';
import { bookSchema } from './schemas/book';
import { transformBook } from './transforms/bookTransforms';

export default async function getBook(
	versionId: string,
	bookId: string,
): Promise<BibleChapterDetailBookFragment> {
	const book = await getFcbhBook(versionId, bookId).catch(() => null);

	if (book) {
		return bookSchema.transform(transformBook).parse(book);
	}

	if (!bookId) {
		throw new Error(`Book not found: ${bookId}`);
	}

	const result = await getGraphqlBook({
		bookId,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	if (!result?.sequence) {
		throw new Error(`Book not found: ${bookId}`);
	}

	return result.sequence;
}
