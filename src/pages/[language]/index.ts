import _ from 'lodash';

import Home, { HomeProps } from '@containers/home';
import { getSermons } from '@lib/api';
import { LANGUAGES } from '@lib/constants';

import type { StaticPaths } from '../../../types';

export default Home;

interface StaticProps {
	props: HomeProps;
	revalidate: number;
}

interface GetStaticPropsArgs {
	params: {
		language: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const language = _.get(params, 'language'),
		langKey = _.findKey(LANGUAGES, (l) => l.base_url === language);

	if (!langKey) throw Error('Missing or invalid language');

	const sermons = await getSermons(langKey, { first: 5 });
	return {
		props: {
			sermons: (sermons && sermons.nodes) || [],
		},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}`),
		fallback: true,
	};
}
