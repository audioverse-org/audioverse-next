import getFcbhBible from './getFcbhBible';

export default function doesFcbhVersionHaveChapter(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
) {
	const fcbhBible = getFcbhBible(versionId);

	if (!fcbhBible) {
		return false;
	}

	const book = fcbhBible.books.find(
		(b) => b.name.toLowerCase() === bookName.toLowerCase(),
	);

	if (!book) {
		return false;
	}

	return book.chapters.includes(chapterNumber);
}
