import { IBBFilesetBookChapter } from '../types';
import fetchResponse from './fetchResponse';
import { getFcbhFilesetId } from './getFcbhFilesetId';

export async function fetchFcbhChapterMediaUrl(
	bibleId: string,
	testament: 'OT' | 'NT',
	bookId: string,
	chapterNumber: number,
): Promise<string> {
	const filesetId = getFcbhFilesetId(bibleId, testament);

	const response = await fetchResponse<{ data: IBBFilesetBookChapter[] }>(
		`bibles/filesets/${filesetId}/${bookId}/${chapterNumber}`,
	);

	if (!response?.data?.[0]?.path) {
		throw new Error('No media path returned from FCBH API');
	}

	return response.data[0].path;
}
