import pMemoize from 'p-memoize';

import doesFcbhVersionHaveChapter from './fcbh/doesFcbhVersionHaveChapter';
import { getCachedGraphqlChapterId } from './graphql/getCachedGraphqlVersionIndex';
import { toTitleCase } from './utils';

/**
 * Checks if a Bible version has a specific chapter
 * @param versionId The version ID to check
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns True if the version has the chapter, false otherwise
 */
async function _doesVersionHaveChapter(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): Promise<boolean> {
	const fcbhHasChapter = doesFcbhVersionHaveChapter(
		versionId,
		bookName,
		chapterNumber,
	);

	if (fcbhHasChapter) {
		return true;
	}

	const graphqlChapterId = getCachedGraphqlChapterId(
		versionId,
		toTitleCase(bookName),
		chapterNumber,
	);

	return !!graphqlChapterId;
}

export default pMemoize(_doesVersionHaveChapter);
