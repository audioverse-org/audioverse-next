import { fetchFcbhChapters } from './fetchFcbhChapters';
import getFcbhBible from './getFcbhBible';

export default async function getFcbhBook(versionId: string, bookId: string) {
	const fcbhBible = getFcbhBible(versionId);

	if (!fcbhBible) {
		throw new Error(`Bible ${versionId} not found`);
	}

	const book = fcbhBible.books.find((b) => {
		const id = b.book_id.split('/')[1];

		return id.toLowerCase() === bookId.toLowerCase();
	});

	if (!book) {
		throw new Error(`Book ${bookId} not found in ${versionId}`);
	}

	// WORKAROUND: FCBH media URLs expire, so we need to re-fetch
	// the chapters here to make sure the URLs are valid.
	book.chapters_full = await fetchFcbhChapters(
		versionId,
		fcbhBible.title,
		book.testament,
		bookId,
	);

	return book;
}
