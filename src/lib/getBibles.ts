import {
	CollectionContentType,
	Language,
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { BibleIndexProps } from '~src/containers/bible';
import { getAudiobibleIndexData } from '~src/containers/bible/__generated__';
import { BOOK_ID_MAP } from '~src/services/fcbh/constants';
import { getBibleBookChapters } from '~src/services/fcbh/getBibleBookChapters';
import { getBibles as _getFcbhBibles } from '~src/services/fcbh/getBibles';
import { IBibleBookChapter, IBibleVersion } from '~src/services/fcbh/types';

import root from './routes';

type ApiBible = BibleIndexProps['versions'][0];
type ApiBook = NonNullable<ApiBible['sequences']['nodes']>[0];
type ApiChapter = NonNullable<ApiBook['recordings']['nodes']>[0];

async function transform(
	languageRoute: string,
	bible: IBibleVersion,
): Promise<ApiBible> {
	const books = Object.keys(BOOK_ID_MAP).map(
		async (bookId, i): Promise<ApiBook> => {
			const testament = i < 39 ? 'OT' : 'NT';
			const bbChapters = await getBibleBookChapters(
				bible.id,
				testament,
				bookId,
			);
			const title = bbChapters[0].book_name;

			if (!title) {
				console.log({ bible, testament, bookId, bbChapters });
				throw new Error(
					`Could not determine book title: ${bible.id} ${testament} ${bookId}`,
				);
			}

			const chapters = bbChapters.map(
				(bbChapter: IBibleBookChapter): ApiChapter => {
					return {
						id: bbChapter.id,
						title: bbChapter.title,
						canonicalPath: root
							.lang(languageRoute)
							.bibles.versionId(bible.id)
							.bookId(bookId)
							.chapterNumber(bbChapter.number)
							.get(),
						duration: bbChapter.duration,
						recordingContentType: RecordingContentType.BibleChapter,
						sequence: {
							id: bbChapter.id,
							title,
							contentType: SequenceContentType.BibleBook,
						},
						audioFiles: [],
						videoFiles: [],
						videoStreams: [],
						collection: {
							id: bible.id,
							title: bible.title,
							contentType: CollectionContentType.BibleVersion,
						},
						speakers: [],
						sponsor: null,
					};
				},
			);

			return {
				id: bookId,
				title,
				recordings: {
					nodes: chapters,
				},
			};
		},
	);
	return {
		...bible,
		sequences: {
			nodes: await Promise.all(books),
		},
	};
}

async function getFcbhBibles(
	languageRoute: string,
): Promise<ApiBible[] | null> {
	try {
		const response = await _getFcbhBibles();

		if (!response) {
			return null;
		}

		return Promise.all(response.map((b) => transform(languageRoute, b)));
	} catch (e) {
		console.log(e);
		return null;
	}
}

async function getApiBibles(languageId: Language): Promise<ApiBible[] | null> {
	const apiData = await getAudiobibleIndexData({
		language: languageId,
	}).catch(() => null);

	return apiData?.collections.nodes || null;
}

function concatBibles(
	first: ApiBible[] | null,
	second: ApiBible[] | null,
): ApiBible[] {
	return [...(first || []), ...(second || [])].sort((a, b) =>
		a.title.localeCompare(b.title),
	);
}

export default async function getBibles(languageId: Language): Promise<{
	fcbh: ApiBible[] | null;
	api: ApiBible[] | null;
	all: ApiBible[];
}> {
	const fcbh = await getFcbhBibles(languageId);
	const api = await getApiBibles(languageId);
	const all = concatBibles(fcbh, api);

	return { fcbh, api, all };
}
