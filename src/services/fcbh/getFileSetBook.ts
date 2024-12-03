import getResponse from './getResponse';
import type { IBBFilesetBook } from './types';

export default function getFileSetBook(
	filesetId: string,
	bookId: string,
): Promise<{ data: Array<IBBFilesetBook> } | null> {
	return getResponse<{ data: Array<IBBFilesetBook> }>(
		`/download/${filesetId}/${bookId}`,
	);
}
