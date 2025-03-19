import doesFcbhVersionHaveChapter from './fcbh/doesFcbhVersionHaveChapter';
import { getGraphqlChapterId } from './graphql/getGraphqlChapterId';

/**
 * Checks if a Bible version has a specific chapter
 * @param versionId The version ID to check
 * @param bookName The book name
 * @param chapterNumber The chapter number
 * @returns True if the version has the chapter, false otherwise
 */
export default async function doesVersionHaveChapter(
	versionId: string | number,
	bookId: string,
	chapterNumber: number,
): Promise<boolean> {
	const fcbhHasChapter = doesFcbhVersionHaveChapter(
		versionId,
		bookId,
		chapterNumber,
	);

	if (fcbhHasChapter) {
		return true;
	}

	const graphqlChapterId = await getGraphqlChapterId(
		versionId,
		bookId,
		chapterNumber,
	);

	return !!graphqlChapterId;
}
