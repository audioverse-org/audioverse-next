import { getGraphqlChapterId } from './getGraphqlChapterId';

/**
 * Checks if a version has a specific chapter using cached indices
 * @param versionId The version ID
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns True if the version has the chapter, false otherwise
 */

export function doesGraphqlVersionHaveChapter(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): boolean {
	return !!getGraphqlChapterId(versionId, bookName, chapterNumber);
}
