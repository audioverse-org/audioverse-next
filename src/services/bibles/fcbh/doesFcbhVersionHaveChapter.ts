import getFcbhBible from './getFcbhBible';

/**
 * Checks if an FCBH Bible version has a specific chapter
 * @param versionId The version ID to check
 * @param bookId The book ID
 * @param chapterNumber The chapter number
 * @returns True if the FCBH version has the chapter, false otherwise
 */
export default function doesFcbhVersionHaveChapter(
	versionId: string | number,
	bookId: string,
	chapterNumber: number,
): boolean {
	const fcbhBible = getFcbhBible(versionId);

	if (!fcbhBible) {
		return false;
	}

	const book = fcbhBible.books.find((b) => b.book_id === bookId);

	if (!book) {
		return false;
	}

	return book.chapters.includes(chapterNumber);
}
