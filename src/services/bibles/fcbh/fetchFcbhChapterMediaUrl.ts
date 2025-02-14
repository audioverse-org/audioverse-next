import { IBBFilesetBookChapter } from '../types';
import fetchResponse from './fetchResponse';

export async function fetchFcbhChapterMediaUrl(
	bibleId: string,
	testament: 'OT' | 'NT',
	bookId: string,
	chapterNumber: number,
): Promise<string> {
	const filesetId = `${bibleId.substring(0, bibleId.length - 1)}${testament === 'OT' ? 'O' : 'N'}${bibleId.substring(bibleId.length - 1)}DA`;
	const response = await fetchResponse<{ data: IBBFilesetBookChapter }>(
		`/bibles/filesets/${filesetId}/${bookId}/${chapterNumber}?`,
	);

	return response.data.path;
}
