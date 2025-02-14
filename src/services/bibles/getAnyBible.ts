import { fetchFcbhChapters } from './fcbh/fetchFcbhChapters';
import getFcbhBible from './fcbh/getFcbhBible';
import getApiBible, { ApiBible } from './getApiBible';
import { versionSchema } from './schemas/version';

export default async function getAnyBible(
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
		return versionSchema.parse(fcbhMatch);
	}

	const apiMatch = await getApiBible(versionId);

	return apiMatch || undefined;
}
