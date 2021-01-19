import _ from 'lodash';

import {
	ENTRIES_PER_PAGE,
	LANGUAGES,
	LIST_PRERENDER_LIMIT,
} from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export async function makeNumberedPaths(
	sectionSegments: string,
	getCount: (language: string) => Promise<number>
): Promise<string[]> {
	const keys = _.keys(LANGUAGES) as Language[];
	const pathSetPromises = keys.map(async (k) => {
			const entryCount = (await getCount(k)) || 0;
			const pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE);
			const toGenerate = Math.max(pageCount, LIST_PRERENDER_LIMIT);
			const numbers = Array.from(Array(toGenerate).keys());
			const base = LANGUAGES[k].base_url;

			// TODO: Extract route generation
			return numbers.map((x) => `/${base}/${sectionSegments}/page/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return _.flatten(pathSets);
}

export const getNumberedStaticPaths = async (
	basePath: string,
	getCount: (language: string) => Promise<number>
): Promise<StaticPaths> => {
	return {
		paths: await makeNumberedPaths(basePath, getCount),
		fallback: true,
	};
};
