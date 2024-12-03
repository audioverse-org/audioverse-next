import getResponse from './getResponse';
import type { IBBFilesetBookChapter } from './types';

export default function getFileSetBook(
	filesetId: string,
	bookId: string,
): Promise<{ data: Array<IBBFilesetBookChapter> } | null> {
	return getResponse<{ data: Array<IBBFilesetBookChapter> }>(
		`/download/${filesetId}/${bookId}`,
	);
}
