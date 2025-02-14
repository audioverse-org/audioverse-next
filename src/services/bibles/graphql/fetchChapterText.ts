import { doFetchChapterText } from './__generated__/fetchChapterText';

function unwrapText(raw: string) {
	const matches = raw.match(/<p>.+<\/p>/) || [];
	return matches[0] || '';
}

export default async function fetchChapterText(
	bibleId: string, // ENGKJVC
	bookId: string, // Gen
	chapterNumber: number,
) {
	const result = await doFetchChapterText({
		bibleId,
		bookId: `${bibleId}-${bookId}`,
		chapterId: `${bibleId}-${bookId}-${chapterNumber}`,
	});

	return unwrapText(result.audiobible?.book.chapter.text || '');
}
