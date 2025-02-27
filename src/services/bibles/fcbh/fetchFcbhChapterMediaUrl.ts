import { IBBFilesetBookChapter } from '../types';
import { toTitleCase } from '../utils';
import fetchResponse from './fetchResponse';
import { getFcbhBookId } from './getFcbhBookId';
import { getFcbhFilesetId } from './getFcbhFilesetId';

export async function fetchFcbhChapterMediaUrl(
	bibleId: string,
	testament: 'OT' | 'NT',
	bookName: string,
	chapterNumber: number,
): Promise<string> {
	const formattedBookName = toTitleCase(bookName);
	const filesetId = getFcbhFilesetId(bibleId, testament);
	const fcbhBookId = getFcbhBookId(formattedBookName);

	const response = await fetchResponse<{ data: IBBFilesetBookChapter[] }>(
		`bibles/filesets/${filesetId}/${fcbhBookId}/${chapterNumber}`,
	);

	if (!response?.data?.[0]?.path) {
		throw new Error('No media path returned from FCBH API');
	}

	return response.data[0].path;
}
