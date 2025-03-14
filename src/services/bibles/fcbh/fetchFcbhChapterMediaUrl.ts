import { IBBFilesetBookChapter } from '../types';
import fetchResponse from './fetchResponse';

export async function fetchFcbhChapterMediaUrl(
	filesetId: string,
	bookId: string,
	chapterNumber: number,
): Promise<string> {
	const response = await fetchResponse<{ data: IBBFilesetBookChapter[] }>(
		`bibles/filesets/${filesetId}`,
	);
	const file = response.data.find(
		(f) => f.book_id === bookId && f.chapter_start === chapterNumber,
	);

	if (!file) {
		throw new Error('No file found for book and chapter');
	}

	return file.path;
}
