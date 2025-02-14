import getFcbhBook from './getFcbhBook';

export default async function getFcbhChapter(
	versionId: string,
	bookName: string,
	chapterNumber: number,
) {
	const book = await getFcbhBook(versionId, bookName);

	if (!book) {
		throw new Error(`Book not found: ${bookName}`);
	}

	if (!book.chapters_full.length) {
		throw new Error(`Chapters not found for book: ${bookName}`);
	}

	const chapter = book.chapters_full.find(
		(c) => c.number === Number(chapterNumber),
	);

	if (!chapter) {
		throw new Error(`Chapter not found: ${bookName} ${chapterNumber}`);
	}

	return chapter;
}
