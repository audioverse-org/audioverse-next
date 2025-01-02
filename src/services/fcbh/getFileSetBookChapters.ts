import getResponse from './getResponse';
import type { IBBFilesetBookChapter } from './types';

/**
 * Retrieves chapters for a given fileset and book.
 *
 * @param {string} filesetId - The ID of the fileset to retrieve chapters from. Example: "ENGKJVN2DA".
 * @param {string} bookId - The ID of the book within the fileset. Example: "MAT".
 * @returns {Promise<Array<IBBFilesetBookChapter> | null>} A promise that resolves to an array of book chapters or null if the response is empty.
 */
export default async function getFileSetBookChapters(
	filesetId: string,
	bookId: string,
): Promise<Array<IBBFilesetBookChapter> | null> {
	const response = await getResponse<{ data: Array<IBBFilesetBookChapter> }>(
		`/download/${filesetId}/${bookId}`,
	);

	return response?.data || null;
}
