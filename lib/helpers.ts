import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';
import _ from 'lodash';

export const getNumberedStaticPaths = async (
	sectionSegments: string,
	getCount: (language: string) => Promise<number>
) => {
	const pathSetPromises = Object.keys(LANGUAGES).map(async (k) => {
			const sermonCount = await getCount(k),
				pageCount = Math.ceil(sermonCount / ENTRIES_PER_PAGE),
				numbers = Array.from(Array(pageCount).keys()),
				base = LANGUAGES[k].base_url;

			return numbers.map((x) => `/${base}/${sectionSegments}/${x + 1}`);
		}),
		pathSets = await Promise.all(pathSetPromises);

	return {
		paths: pathSets.flat(),
		fallback: 'unstable_blocking',
	};
};

export async function getPaginatedStaticProps(language: string, pageIndex: number, getter: any) {
	const langKey = _.findKey(LANGUAGES, (l) => l.base_url === language),
		offset = (pageIndex - 1) * ENTRIES_PER_PAGE;

	if (!langKey) throw Error('Missing or invalid language');

	const result = await getter(langKey, {
		offset,
		first: ENTRIES_PER_PAGE,
	}).catch(() => []);

	const nodes = _.get(result, 'nodes'),
		total = Math.ceil(_.get(result, 'aggregate.count') / ENTRIES_PER_PAGE);

	return {
		props: {
			nodes,
			pagination: {
				total,
				current: pageIndex,
			},
		},
		revalidate: 10,
	};
}
