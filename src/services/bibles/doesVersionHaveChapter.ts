import doesFcbhVersionHaveChapter from './fcbh/doesFcbhVersionHaveChapter';
import { fetchGraphqlChapterId } from './graphql/graphqlVersionIndex';
import { toTitleCase } from './utils';

export default async function doesVersionHaveChapter(
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

	const formattedName = toTitleCase(bookName);
	const graphqlChapterId = await fetchGraphqlChapterId(
		versionId,
		formattedName,
		chapterNumber,
	).catch(() => null);

	return !!graphqlChapterId;
}
