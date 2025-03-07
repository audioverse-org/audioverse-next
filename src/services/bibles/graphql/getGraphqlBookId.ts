import { getGraphqlVersionIndex } from './getGraphqlVersionIndex';

/**
 * Gets a book ID from the cached GraphQL version indices
 * @param versionId The version ID
 * @param bookName The book name
 * @returns The book ID or null if not found
 */
export async function getGraphqlBookId(
	versionId: string | number,
	bookName: string,
): Promise<string | number | null> {
	const versionIndex = await getGraphqlVersionIndex(versionId);

	if (!versionIndex) {
		return null;
	}

	const sequence = versionIndex.sequences.nodes?.find(
		(s) => s.title === bookName,
	);
	return sequence?.id || null;
}
