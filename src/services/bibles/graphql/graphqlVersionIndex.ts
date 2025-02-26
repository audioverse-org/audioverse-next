import { toTitleCase } from '../utils';
import { getGraphqlVersionIndex } from './__generated__/graphqlVersionIndex';

export async function fetchGraphqlBookId(
	versionId: string,
	bookName: string,
): Promise<string | number> {
	const formattedName = toTitleCase(bookName);
	const index = await getGraphqlVersionIndex({
		collectionId: Number(versionId),
	}).catch(() => null);

	const sequence = index?.collection?.sequences.nodes?.find(
		(s) => s.title === formattedName,
	);

	if (!sequence) {
		throw new Error(`Sequence not found for book: ${formattedName}`);
	}

	return sequence.id;
}

export async function fetchGraphqlChapterId(
	versionId: string | number,
	bookName: string,
	chapterNumber: number,
): Promise<string | number> {
	const formattedName = toTitleCase(bookName);
	const index = await getGraphqlVersionIndex({
		collectionId: Number(versionId),
	}).catch(() => null);

	const sequence = index?.collection?.sequences.nodes?.find(
		(s) => s.title === formattedName,
	);

	if (!sequence) {
		throw new Error(`Sequence not found for book: ${formattedName}`);
	}

	const recording = sequence.recordings.nodes?.find(
		(r) => r.title === `${formattedName} ${chapterNumber}`,
	);

	if (!recording) {
		throw new Error(
			`Recording not found for book: ${formattedName} ${chapterNumber}`,
		);
	}

	return recording.id;
}
