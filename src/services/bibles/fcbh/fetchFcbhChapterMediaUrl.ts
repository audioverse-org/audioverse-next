import { IBBFilesetBookChapter } from '../types';
import fetchResponse from './fetchResponse';
import { getFcbhBookId } from './getFcbhBookId';
import { getFcbhFilesetId } from './getFcbhFilesetId';

export async function fetchFcbhChapterMediaUrl(
	bibleId: string,
	testament: 'OT' | 'NT',
	bookId: string,
	chapterNumber: number,
): Promise<string> {
	const filesetId = getFcbhFilesetId(bibleId);
	const fcbhBookId = getFcbhBookId(bookId);

	console.debug('Fetching FCBH chapter media URL:', {
		bibleId,
		filesetId,
		bookId,
		fcbhBookId,
		chapterNumber,
		testament,
	});

	const response = await fetchResponse<{ data: IBBFilesetBookChapter[] }>(
		`bibles/filesets/${filesetId}/${fcbhBookId}/${chapterNumber}`,
	);

	if (!response?.data?.[0]?.path) {
		throw new Error('No media path returned from FCBH API');
	}

	return response.data[0].path;
}
