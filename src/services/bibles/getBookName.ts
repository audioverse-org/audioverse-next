import { BIBLE_BOOK_METAS } from './constants';

export default function getBookName(bookNameLike: string) {
	const meta = BIBLE_BOOK_METAS.find((m) => {
		const s = bookNameLike.toLowerCase();
		return (
			m.fullName.toLowerCase() === s ||
			m.fcbhId.toLowerCase() === s ||
			m.shortName.toLowerCase() === s
		);
	});
	return meta?.fullName;
}
