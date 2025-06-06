import { BibleReference } from '~src/__generated__/graphql';
import { TeaseRecordingFragment } from '~src/components/molecules/__generated__/teaseRecording';

import { getBibleRelatedTeachings } from './__generated__/getRelatedTeachings';
import { getBookReference } from './getBookMeta';

export default async function getRelatedTeachings(
	bookId: string,
	chapter: number,
): Promise<TeaseRecordingFragment[]> {
	const bookReference = getBookReference(bookId);

	if (!bookReference) {
		throw new Error(
			`No teachings found for book ${bookId} and chapter ${chapter}`,
		);
	}
	const bibleReference: BibleReference = {
		book: bookReference,
		chapter: chapter,
		verse: 0,
	};

	const results = await getBibleRelatedTeachings({ bibleReference }).catch(
		(e) => {
			console.error(e);
			throw new Error(
				`Error fetching teachings for book ${bookId} and chapter ${chapter}`,
			);
		},
	);

	if (!results?.recordings.nodes) {
		throw new Error(
			`No teachings found for book ${bookId} and chapter ${chapter}`,
		);
	}

	return results.recordings.nodes.map((sermon): TeaseRecordingFragment => {
		return {
			...sermon,
		};
	});
}
