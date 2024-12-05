import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import Bible, { BibleIndexProps } from '~containers/bible';
import { LANGUAGES, REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import root from '~lib/routes';
import { Language } from '~src/__generated__/graphql';
import { getAudiobibleIndexData } from '~src/containers/bible/__generated__';
import { BOOK_ID_MAP } from '~src/services/fcbh/constants';
import { getBibleBookChapters } from '~src/services/fcbh/getBibleBookChapters';
import { getBibles } from '~src/services/fcbh/getBibles';
import { IBibleBookChapter, IBibleVersion } from '~src/services/fcbh/types';

export default Bible;

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

async function getFcbhBibles(
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

async function getApiBibles(languageId: Language): Promise<ApiBible[] | null> {
	const apiData = await getAudiobibleIndexData({
		language: languageId,
	}).catch(() => null);

	return apiData?.collections.nodes || null;
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<BibleIndexProps & IBaseProps>
> {
	const languageRoute = params?.language || 'en';
	const languageId = getLanguageIdByRoute(languageRoute);
	const apiBibles = await getApiBibles(languageId);

	if (!apiBibles) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const fcbhBibles = await getFcbhBibles(languageRoute);
	const intl = await getIntl(languageId);

	return {
		props: {
			data: [...(fcbhBibles || []), ...apiBibles].sort((a, b) =>
				a.title.localeCompare(b.title),
			),
			title: intl.formatMessage({
				id: 'bible__title',
				defaultMessage: 'Bible',
			}),
		},
		revalidate: fcbhBibles ? REVALIDATE : REVALIDATE_FAILURE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [root.lang(LANGUAGES.ENGLISH.base_urls[0]).bibles.get()],
		fallback: false,
	};
}
