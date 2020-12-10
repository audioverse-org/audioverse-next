import _ from 'lodash';

import Search, { SearchProps } from '@containers/search';
import { LANGUAGES } from '@lib/constants';

import type { StaticPaths } from '../../../types';

export default Search;

interface StaticProps {
	props: SearchProps;
	revalidate: number;
}

export async function getStaticProps(): Promise<StaticProps> {
	return {
		props: {},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}/search`),
		fallback: true,
	};
}
