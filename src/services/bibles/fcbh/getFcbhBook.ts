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

	// WORKAROUND: FCBH media URLs expire, so we need to re-fetch
	// the chapters here to make sure the URLs are valid.
	book.chapters_full = await fetchFcbhChapters(
		versionId,
		fcbhBible.title,
		book.testament,
		book.book_id,
	);

	return book;
}
