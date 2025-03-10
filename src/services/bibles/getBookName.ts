import { BIBLE_BOOK_METAS } from './constants';

export default function getBookMeta(bookIdentifier: string) {
	const meta = BIBLE_BOOK_METAS.find((m) => {
		const s = bookIdentifier.toLowerCase();
		return (
			m.fullName.toLowerCase() === s ||
			m.fcbhId.toLowerCase() === s ||
			m.shortName.toLowerCase() === s
		);
	});
	return meta;
}
