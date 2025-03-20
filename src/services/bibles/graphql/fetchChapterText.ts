import { BIBLE_BOOK_METAS } from '../constants';
import { doFetchChapterText } from './__generated__/fetchChapterText';

const TEXT_SOURCE_VERSION = 'ENGKJVC' as const;

function unwrapText(raw: string) {
	const matches = raw.match(/<p>.+<\/p>/) || [];
	return matches[0] || '';
}

export default async function fetchChapterText(
	bookId: string, // GEN
	chapterNumber: number,
) {
	const m = BIBLE_BOOK_METAS.find(
		(b) => b.fcbhId.toLowerCase() === bookId.toLowerCase(),
	);

	if (!m) {
		throw new Error(`Book meta not found for ${bookId}`);
	}

	const result = await doFetchChapterText({
		bibleId: TEXT_SOURCE_VERSION,
		bookId: `${TEXT_SOURCE_VERSION}-${m.shortName}`,
		chapterId: `${TEXT_SOURCE_VERSION}-${m.shortName}-${chapterNumber}`,
	});

	return unwrapText(result.audiobible?.book.chapter.text || '');
}
