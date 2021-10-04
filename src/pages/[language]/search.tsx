import _ from 'lodash';

import Search, { SearchProps } from '@containers/search';
import { LANGUAGES, REVALIDATE } from '@lib/constants';

export default Search;

export async function getStaticProps(): Promise<StaticProps<SearchProps>> {
	return {
		props: {},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}/search`),
		fallback: true,
	};
}
