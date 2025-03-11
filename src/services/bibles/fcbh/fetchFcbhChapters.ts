import { IBBFileset, IBibleBookChapter, Testament } from '../types';
import fetchResponse from './fetchResponse';
import { getFcbhFilesetId } from './getFcbhFilesetId';

export async function fetchFcbhChapters(
	bibleId: string,
	bibleName: string,
	testament: Testament,
	bookId: string,
): Promise<IBibleBookChapter[]> {
	if (!bookId) {
		throw new Error('Book ID is required');
	}

	const filesetId = getFcbhFilesetId(bibleId, testament);
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
			id: `${filesetId}/${book_id}/${chapter_start}`,
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
