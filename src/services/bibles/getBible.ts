import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getFcbhBible from './fcbh/getFcbhBible';
import fetchGraphqlBible, { ApiBible } from './graphql/fetchGraphqlBible';
import { versionSchema } from './schemas/version';
import { transformVersion } from './transforms/versionTransforms';

export default async function getBible(
	versionId: string,
): Promise<ApiBible | undefined> {
	const fcbhMatch = getFcbhBible(versionId);

	if (fcbhMatch) {
		await Promise.all(
			fcbhMatch.books.map(async (book) => {
				book.chapters_full = await fetchFcbhChapters(
					fcbhMatch.id,
					fcbhMatch.title,
					book.testament,
					book.book_id,
				);
			}),
		);
		return versionSchema.transform(transformVersion).parse(fcbhMatch);
	}

	const apiMatch = await fetchGraphqlBible(versionId);

	return apiMatch || undefined;
}
