import { BIBLE_BOOK_METAS } from '../constants';

export function getFcbhBookId(bookName: string): string {
	const decodedBookName = decodeURIComponent(bookName);
	const bookMeta = Object.values(BIBLE_BOOK_METAS).find(
		(meta) => meta.fullName.toLowerCase() === decodedBookName.toLowerCase(),
	);

	if (!bookMeta) {
		throw new Error(`Book ${decodedBookName} not found in BIBLE_BOOK_METAS`);
	}

	return bookMeta.fcbhId;
}
