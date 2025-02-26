import doesFcbhVersionHaveChapter from './fcbh/doesFcbhVersionHaveChapter';
import { fetchGraphqlChapterId } from './graphql/graphqlVersionIndex';
import { toTitleCase } from './utils';

/**
 * Checks multiple Bible versions at once to see which ones have a specific chapter
 * @param versionIds Array of version IDs to check
 * @param bookName Name of the book
 * @param chapterNumber Chapter number
 * @returns Object mapping version IDs to boolean values indicating if they have the chapter
 */
export async function batchCheckVersionsWithChapter(
	versionIds: (string | number)[],
	bookName: string,
	chapterNumber: number,
): Promise<Record<string, boolean>> {
	const formattedName = toTitleCase(bookName);
	const results: Record<string, boolean> = {};

	// First check all FCBH versions (these are synchronous and fast)
	for (const id of versionIds) {
		const hasFcbhChapter = doesFcbhVersionHaveChapter(
			id,
			bookName,
			chapterNumber,
		);
		if (hasFcbhChapter) {
			results[id] = true;
		}
	}

	// Get IDs of versions that aren't in FCBH or don't have the chapter
	const nonFcbhVersionIds = versionIds.filter((id) => !results[id]);

	// Check GraphQL versions in parallel
	const graphqlChecks = await Promise.all(
		nonFcbhVersionIds.map(async (id) => {
			const chapterId = await fetchGraphqlChapterId(
				id,
				formattedName,
				chapterNumber,
			).catch(() => null);
			return { id, hasChapter: !!chapterId };
		}),
	);

	// Add GraphQL results to the results object
	graphqlChecks.forEach(({ id, hasChapter }) => {
		results[id] = hasChapter;
	});

	return results;
}
