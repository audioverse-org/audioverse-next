import Search, { SearchProps } from '@containers/search';
import { LANGUAGES } from '@lib/constants';

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
		paths: Object.values(LANGUAGES).map((l) => `/${l.base_url}/search`),
		fallback: 'unstable_blocking',
	};
}
