import _ from 'lodash';

import SermonList, { SermonListProps } from '@containers/sermon/list';
import { getSermonCount, getSermons } from '@lib/api';
import { ENTRIES_PER_PAGE, LANGUAGES } from '@lib/constants';
import { makeNumberedPaths } from '@lib/helpers';

export default SermonList;

interface StaticProps {
	props: SermonListProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({ params }: GetStaticPropsArgs): Promise<StaticProps> {
	const { i, language } = params,
		langKey = _.findKey(LANGUAGES, (l) => l.base_url === language),
		offset = (parseInt(i) - 1) * ENTRIES_PER_PAGE;

	if (!langKey) throw Error('Missing or invalid language');

	const result = await getSermons(langKey, {
		offset,
		first: ENTRIES_PER_PAGE,
	}).catch(() => []);

	const sermons = _.get(result, 'nodes'),
		total = Math.ceil(_.get(result, 'aggregate.count') / ENTRIES_PER_PAGE);

	return {
		props: {
			sermons,
			pagination: {
				total,
				current: parseInt(i),
			},
		},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: await makeNumberedPaths('sermons/page', getSermonCount),
		fallback: 'unstable_blocking',
	};
}
