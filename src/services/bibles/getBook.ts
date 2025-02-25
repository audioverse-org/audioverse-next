import { BibleChapterDetailBookFragment } from '~src/containers/bible/__generated__/chapter';

import { getGraphqlBook } from './__generated__/getBook';
import getFcbhBook from './fcbh/getFcbhBook';
import { fetchGraphqlBookId } from './graphql/graphqlVersionIndex';
import { bookSchema } from './schemas/book';
import { transformBook } from './transforms/bookTransforms';

export default async function getBook(
	versionId: string,
	bookName: string,
): Promise<BibleChapterDetailBookFragment> {
	const book = await getFcbhBook(versionId, bookName).catch(() => null);

	if (book) {
		return bookSchema.transform(transformBook).parse(book);
	}

	const bookId = await fetchGraphqlBookId(versionId, bookName);
	const result = await getGraphqlBook({
		bookId,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	if (!result?.sequence) {
		throw new Error(`Book not found: ${bookName}`);
	}

	return result.sequence;
}
