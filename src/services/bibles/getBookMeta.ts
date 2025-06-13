import { BIBLE_BOOK_METAS } from './constants';

export default function getBookMeta(bookIdentifier: string) {
	const meta = BIBLE_BOOK_METAS.find((m) => {
		const s = bookIdentifier.split('/').pop()?.toLowerCase();
		return (
			m.fullName.toLowerCase() === s ||
			m.fcbhId.toLowerCase() === s ||
			m.shortName.toLowerCase() === s
		);
	});
	return meta;
}

export function getBookReference(bookIdentifier: string) {
	const bibleRef = BIBLE_BOOK_METAS.find(
		(m) => m.fcbhId.toLowerCase() === bookIdentifier.toLocaleLowerCase(),
	);
	return bibleRef?.bibleReferenceBook;
}
