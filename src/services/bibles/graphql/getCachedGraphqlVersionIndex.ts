import { graphqlVersionIndices } from './graphqlVersionIndices';

function isKey(
	key: string | number,
): key is keyof typeof graphqlVersionIndices {
	return typeof key === 'string' && key in graphqlVersionIndices;
}

/**
 * Gets a book ID from the cached GraphQL version indices
 * @param versionId The version ID
 * @param bookName The book name
 * @returns The book ID or null if not found
 */
export function getCachedGraphqlBookId(
	versionId: string | number,
	bookName: string,
): string | number | null {
	if (!isKey(versionId)) {
		return null;
	}

	const versionIndex = graphqlVersionIndices[versionId];

	if (!versionIndex) {
		return null;
	}

	const sequence = versionIndex.find((s) => s.title === bookName);
	return sequence?.id || null;
}

/**
 * Gets a chapter ID from the cached GraphQL version indices
 * @param versionId The version ID
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns The chapter ID or null if not found
 */
export function getCachedGraphqlChapterId(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): string | number | null {
	if (!isKey(versionId)) {
		return null;
	}

	const versionIndex = graphqlVersionIndices[versionId];

	if (!versionIndex) {
		return null;
	}

	const sequence = versionIndex.find((s) => s.title === bookName);

	if (!sequence) {
		return null;
	}

	const recording = sequence.recordings.find(
		(r) => r.title === `${bookName} ${chapterNumber}`,
	);

	return recording?.id || null;
}

/**
 * Checks if a version has a specific chapter using cached indices
 * @param versionId The version ID
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns True if the version has the chapter, false otherwise
 */
export function doesCachedVersionHaveChapter(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): boolean {
	return !!getCachedGraphqlChapterId(versionId, bookName, chapterNumber);
}
