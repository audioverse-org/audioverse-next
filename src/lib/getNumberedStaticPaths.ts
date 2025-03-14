import { GetStaticPathsResult } from 'next';

import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
	SupportedLanguages,
} from '~lib/constants';
import getLanguageIds from '~lib/getLanguageIds';
import { Language } from '~src/__generated__/graphql';

type Getter<T> = (variables: { language: Language }) => Promise<T>;
type Parser<T> = (data: T) => number | null | undefined;

const makeLanguagePaths = async <T>(
	language: SupportedLanguages,
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>,
) => {
	const data = await getter({ language });
	const entryCount = parseCount(data) || 0;
	const pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE);
	const limit = Math.min(pageCount, LIST_PRERENDER_LIMIT);
	const bases = LANGUAGES[language].base_urls;
	const range = [...Array(limit).keys()].map((x) => x + 1);

	return bases
		.map((b) => range.map((x) => `/${b}/${innerSegment}/page/${x}`))
		.flat();
};

export const getNumberedStaticPaths = async <T>(
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>,
): Promise<GetStaticPathsResult> => {
	const keys = getLanguageIds();
	const pathSetPromises = keys.map((k) =>
		makeLanguagePaths(k, innerSegment, getter, parseCount).catch((e) => {
			console.log(`Failed to get some paths for language ${k}`, e);
			return [];
		}),
	);
	const pathSets = await Promise.all(pathSetPromises);
	const paths = pathSets.flat();

	return {
		paths,
		fallback: 'blocking',
	};
};
