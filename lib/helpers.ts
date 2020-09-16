import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';

export const makeNumberedPaths = async (sectionSegments: string, getCount: (language: string) => Promise<number>) => {
	const pathSetPromises = Object.keys(LANGUAGES).map(async (k) => {
			const sermonCount = await getCount(k),
				pageCount = Math.ceil(sermonCount / ENTRIES_PER_PAGE),
				numbers = Array.from(Array(pageCount).keys()),
				base = LANGUAGES[k].base_url;

			return numbers.map((x) => `/${base}/${sectionSegments}/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return pathSets.flat();
};
