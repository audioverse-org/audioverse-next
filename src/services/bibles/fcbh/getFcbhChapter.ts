import getFcbhBook from './getFcbhBook';

export default async function getFcbhChapter(
	versionId: string,
	bookId: string,
	chapterNumber: number,
) {
	const book = await getFcbhBook(versionId, bookId);

	if (!book) {
		throw new Error(`Book not found: ${bookId}`);
	}

	if (!book.chapters_full.length) {
		throw new Error(`Chapters not found for book: ${bookId}`);
	}

	const chapter = book.chapters_full.find(
		(c) => c.number === Number(chapterNumber),
	);

	if (!chapter) {
		throw new Error(`Chapter not found: ${bookId} ${chapterNumber}`);
	}

	return chapter;
}
