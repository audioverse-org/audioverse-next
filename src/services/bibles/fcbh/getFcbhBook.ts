import { IBBBook } from '../types';
import getFcbhVersion from './getFcbhVersion';

export default async function getFcbhBook(
	versionId: string,
	bookId: string,
): Promise<IBBBook> {
	const fcbhBible = getFcbhVersion(versionId);

	if (!fcbhBible) {
		throw new Error(`Bible ${versionId} not found`);
	}

	const book = fcbhBible.books.find(
		(b) => b.book_id.toLowerCase() === bookId.toLowerCase(),
	);

	if (!book) {
		throw new Error(`Book ${bookId} not found in ${versionId}`);
	}

	return book;
}
