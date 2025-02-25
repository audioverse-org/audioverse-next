import { BibleChapterDetailBookFragment } from '~src/containers/bible/__generated__/chapter';

import { getGraphqlBook } from './__generated__/getBook';
import getFcbhBook from './fcbh/getFcbhBook';
import { bookSchema } from './schemas/book';
import { transformBook } from './transforms/bookTransforms';

export default async function getBook(
	versionId: string,
	bookName: string,
): Promise<BibleChapterDetailBookFragment | undefined> {
	const book = await getFcbhBook(versionId, bookName).catch(() => null);

	if (book) {
		return bookSchema.transform(transformBook).parse(book);
	}

	const result = await getGraphqlBook({
		collectionId: Number(versionId),
		bookSearch: bookName,
	}).catch((e) => {
		console.log(e);
		return null;
	});

	return result?.sequences.nodes?.find((b) =>
		b.title.toLowerCase().includes(bookName.toLowerCase()),
	);
}
