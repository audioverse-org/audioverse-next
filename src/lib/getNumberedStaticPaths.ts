import _ from 'lodash';

import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
} from '@lib/constants';
import { Language } from '@lib/generated/graphql';

type Getter<T> = (variables: { language: Language }) => Promise<T>;
type Parser<T> = (data: T) => number | null | undefined;

const makeLanguagePaths = async <T>(
	language: Language,
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>
) => {
	const data = await getter({ language });
	const entryCount = parseCount(data) || 0;
	const pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE);
	const limit = Math.min(pageCount, LIST_PRERENDER_LIMIT) + 1;
	const base = LANGUAGES[language].base_url;

	// TODO: Extract route generation
	return _.range(1, limit).map((x) => `/${base}/${innerSegment}/page/${x}`);
};

export const getNumberedStaticPaths = async <T>(
	innerSegment: string,
	getter: Getter<T>,
	parseCount: Parser<T>
): Promise<StaticPaths> => {
	const keys = _.keys(LANGUAGES) as Language[];
	const pathSetPromises = keys.map((k) =>
		makeLanguagePaths(k, innerSegment, getter, parseCount)
	);
	const pathSets = await Promise.all(pathSetPromises);
	const paths = _.flatten(pathSets);

	return {
		paths,
		fallback: true,
	};
};
