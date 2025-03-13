import { IBBFilesetBookChapter } from '../types';
import fetchResponse from './fetchResponse';

export async function fetchFcbhChapterMediaUrl(
	filesetId: string,
	bookId: string,
	chapterNumber: number,
): Promise<string> {
	const response = await fetchResponse<{ data: IBBFilesetBookChapter[] }>(
		`bibles/filesets/${filesetId}/${bookId}/${chapterNumber}`,
	);

	if (!response?.data?.[0]?.path) {
		throw new Error('No media path returned from FCBH API');
	}

	return response.data[0].path;
}
