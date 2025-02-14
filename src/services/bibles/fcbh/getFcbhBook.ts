import { fetchFcbhChapters } from './fetchFcbhChapters';
import getFcbhBible from './getFcbhBible';

export default async function getFcbhBook(versionId: string, bookName: string) {
	const fcbhBible = getFcbhBible(versionId);

	if (!fcbhBible) {
		throw new Error(`Bible ${versionId} not found`);
	}

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

	return book;
}
