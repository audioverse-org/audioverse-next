import { IBibleBook } from '../types';
import getFcbhBible from './getFcbhBible';

export default async function getFcbhBook(
	versionId: string,
	bookId: string,
): Promise<IBibleBook> {
	const fcbhBible = getFcbhBible(versionId);

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
