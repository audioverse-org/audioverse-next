import { getGraphqlVersionIndex } from './getGraphqlVersionIndex';

/**
 * Gets a book ID from the cached GraphQL version indices
 * @param versionId The version ID
 * @param bookName The book name
 * @returns The book ID or null if not found
 */

export function getGraphqlBookId(
	versionId: string | number,
	bookName: string,
): string | number | null {
	const versionIndex = getGraphqlVersionIndex(versionId);

	if (!versionIndex) {
		return null;
	}

	const sequence = versionIndex.find((s) => s.title === bookName);
	return sequence?.id || null;
}
