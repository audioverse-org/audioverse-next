import { getGraphqlVersionIndex } from './getGraphqlVersionIndex';

/**
 * Gets a chapter ID from the cached GraphQL version indices
 * @param versionId The version ID
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns The chapter ID or null if not found
 */

export async function getGraphqlChapterId(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): Promise<string | number | null> {
	const versionIndex = await getGraphqlVersionIndex(versionId);

	if (!versionIndex) {
		return null;
	}

	const sequence = versionIndex.sequences.nodes?.find(
		(s) => s.title === bookName,
	);

	if (!sequence) {
		return null;
	}

	const recording = sequence.recordings.nodes?.find(
		(r) => r.title === `${bookName} ${chapterNumber}`,
	);

	return recording?.id || null;
}
