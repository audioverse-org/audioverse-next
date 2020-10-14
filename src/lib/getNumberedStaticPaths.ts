import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';

async function makeNumberedPaths(
	getCount: (language: string) => Promise<number>,
	sectionSegments: string
) {
	const pathSetPromises = Object.keys(LANGUAGES).map(async (k) => {
			const entryCount = await getCount(k),
				pageCount = Math.ceil(entryCount / ENTRIES_PER_PAGE),
				numbers = Array.from(Array(pageCount).keys()),
				base = LANGUAGES[k].base_url;

			return numbers.map((x) => `/${base}/${sectionSegments}/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return pathSets.flat();
}

export const getNumberedStaticPaths = async (
	sectionSegments: string,
	getCount: (language: string) => Promise<number>
): Promise<StaticPaths> => {
	return {
		paths: await makeNumberedPaths(getCount, sectionSegments),
		fallback: 'unstable_blocking',
	};
};
