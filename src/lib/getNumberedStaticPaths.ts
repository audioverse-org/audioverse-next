import _ from 'lodash';

import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';

export async function makeNumberedPaths(
	sectionSegments: string,
	getCount: (language: string) => Promise<number>
): Promise<string[]> {
	const keys = _.keys(LANGUAGES) as Language[];
	const pathSetPromises = keys.map(async (k) => {
			const entryCount = (await getCount(k)) || 0,
				pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE),
				numbers = Array.from(Array(pageCount).keys()),
				base = LANGUAGES[k].base_url;

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
