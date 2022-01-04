import flatten from 'lodash/flatten';
import range from 'lodash/range';
import { GetStaticPathsResult } from 'next';

import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
	SupportedLanguages,
} from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import getLanguageIds from '@lib/getLanguageIds';

type Getter<T> = (variables: { language: Language }) => Promise<T>;
type Parser<T> = (data: T) => number | null | undefined;

const makeLanguagePaths = async <T>(
	language: SupportedLanguages,
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>
) => {
	const data = await getter({ language });
	const entryCount = parseCount(data) || 0;
	const pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE);
	const limit = Math.min(pageCount, LIST_PRERENDER_LIMIT) + 1;
	const base = LANGUAGES[language].base_url;

	return range(1, limit).map((x) => `/${base}/${innerSegment}/page/${x}`);
};

export const getNumberedStaticPaths = async <T>(
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>
): Promise<GetStaticPathsResult> => {
	const keys = getLanguageIds();
	const pathSetPromises = keys.map((k) =>
		makeLanguagePaths(k, innerSegment, getter, parseCount)
	);
	const pathSets = await Promise.all(pathSetPromises);
	const paths = flatten(pathSets);

	return {
		paths,
		fallback: 'blocking',
	};
};
