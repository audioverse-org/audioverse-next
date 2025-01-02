import { getBibleBookContent } from '~src/lib/api/__generated__/bibleContent';

import { BOOK_ID_MAP } from './constants';
import getResponse from './getResponse';
import { IBBFileset, IBibleBookChapter } from './types';

export async function getBibleBookChapters(
	bibleId: string,
	testament: string,
	bookId: string,
): Promise<IBibleBookChapter[]> {
	const filesetId = `${bibleId.substring(0, bibleId.length - 1)}${testament === 'OT' ? 'O' : 'N'}${bibleId.substring(bibleId.length - 1)}DA`;
	const response = await getResponse<{ data: IBBFileset[] }>(
		`/bibles/filesets/${filesetId}?`,
	);
	if (!response) {
		return [];
	}

	const result = await getBibleBookContent({
		bibleId: 'ENGKJVC',
		bookId: `ENGKJVC-${BOOK_ID_MAP[bookId]}`,
	});
	const chapters = result.audiobible?.book.chapters || [];
	const textByChapterNumber = chapters.reduce<Record<number, string>>(
		(carry, { text, id }) => {
			const matches = text.match(/<p>.+<\/p>/) || [];
			const key = +id.toString().split('-')[2];
			carry[key] = matches[0] || '';
			return carry;
		},
		{},
	);
	const filesets = response.data?.filter(({ book_id }) => book_id === bookId);

	filesets.sort((a, b) => a.chapter_start - b.chapter_start);

	return filesets.map(
		({ book_id, book_name, chapter_start, path, duration }) => ({
			id: `${book_id}/${chapter_start}`,
			number: chapter_start,
			title: `${book_name} ${chapter_start}`,
			url: path,
			duration,
			text: textByChapterNumber[chapter_start],
			book_name,
		}),
	);
}
