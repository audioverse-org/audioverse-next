import { GetStaticPathsResult } from 'next';

import Search, { SearchProps } from '@containers/search';
import { REVALIDATE } from '@lib/constants';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSearchRoute } from '@lib/routes';

export default Search;

export async function getStaticProps({
	params,
}: {
	params: { language: string };
}): Promise<StaticProps<SearchProps>> {
	return {
		props: {
			language: getLanguageIdByRoute(params.language),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const baseRoutes = getLanguageRoutes();
	return {
		paths: baseRoutes.map((l) => makeSearchRoute(l)),
		fallback: 'blocking',
	};
}
