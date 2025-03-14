import getBookMeta from '../getBookName';
import { getGraphqlVersionIndex } from './getGraphqlVersionIndex';

/**
 * Gets the graphql recording ID for a chapter
 * @param versionId The version ID
 * @param bookId The book ID
 * @param chapterNumber The chapter number
 * @returns The chapter ID or null if not found
 */

export async function getGraphqlChapterId(
	versionId: string | number,
	bookId: string,
	chapterNumber: number,
): Promise<string | number | null> {
	const meta = getBookMeta(bookId);

	if (!meta) {
		return null;
	}

	const bookName = meta.fullName;
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
