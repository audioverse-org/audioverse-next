import { Language } from '~src/__generated__/graphql';
import { BibleIndexProps } from '~src/containers/bible';
import { BOOK_ID_MAP } from '~src/services/fcbh/constants';
import { getBibleBookChapters } from '~src/services/fcbh/getBibleBookChapters';
import { IBibleBookChapter, IBibleVersion } from '~src/services/fcbh/types';
import root from './routes';
import { getBibles } from '~src/services/fcbh/getBibles';
import { getAudiobibleIndexData } from '~src/containers/bible/__generated__';
import { GetStaticPropsResult } from 'next';
import { IBaseProps } from '~src/containers/base';
import { REVALIDATE, REVALIDATE_FAILURE } from './constants';
import { getLanguageIdByRoute } from './getLanguageIdByRoute';
import getIntl from './getIntl';

type ApiBible = BibleIndexProps['data'][0];
type ApiBook = NonNullable<ApiBible['sequences']['nodes']>[0];
type ApiChapter = NonNullable<ApiBook['recordings']['nodes']>[0];

// https://www.audioverse.org/en/bibles/ENGKJV2/GEN/1

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
					};
				},
			);

			const title = bbChapters[0].book_name;

			if (!title) {
				console.log({ bible, testament, bookId, bbChapters });
				throw new Error(
					`Could not determine book title: ${bible.id} ${testament} ${bookId}`,
				);
			}

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

export async function getFcbhBibles(
	languageRoute: string,
): Promise<ApiBible[] | null> {
	try {
		const response = await getBibles();

		if (!response) {
			return null;
		}

		return Promise.all(response.map((b) => transform(languageRoute, b)));
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getApiBibles(
	languageId: Language,
): Promise<ApiBible[] | null> {
	const apiData = await getAudiobibleIndexData({
		language: languageId,
	}).catch(() => null);

	return apiData?.collections.nodes || null;
}

export function concatBibles(
	first: ApiBible[] | null,
	second: ApiBible[] | null,
): ApiBible[] {
	return [...(first || []), ...(second || [])].sort((a, b) =>
		a.title.localeCompare(b.title),
	);
}
