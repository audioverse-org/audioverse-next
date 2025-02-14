import { IBBFileset, IBibleBookChapter } from '../types';
import fetchResponse from './fetchResponse';

export async function fetchFcbhChapters(
	bibleId: string,
	bibleName: string,
	testament: 'OT' | 'NT',
	bookId: string,
): Promise<IBibleBookChapter[]> {
	if (!bookId) {
		throw new Error('Book ID is required');
	}

	const filesetId = `${bibleId.substring(0, bibleId.length - 1)}${testament === 'OT' ? 'O' : 'N'}${bibleId.substring(bibleId.length - 1)}DA`;
	const response = await fetchResponse<{ data: IBBFileset[] }>(
		`/bibles/filesets/${filesetId}?`,
	);

	if (!response) {
		return [];
	}

	const fcbhId = bookId.split('/').pop() ?? '';
	const filesets = response.data?.filter(({ book_id }) => book_id === fcbhId);

	filesets.sort((a, b) => a.chapter_start - b.chapter_start);

	return filesets.map(
		({ book_id, book_name, chapter_start, path, duration }) => ({
			id: `${book_id}/${chapter_start}`,
			number: chapter_start,
			title: `${book_name} ${chapter_start}`,
			url: path,
			duration,
			book_name,
			version_id: bibleId,
			version_name: bibleName,
		}),
	);
}
