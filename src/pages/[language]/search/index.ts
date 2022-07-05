import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import { IBaseProps } from '@containers/base';
import Search, { SearchProps } from '@containers/search';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSearchRoute } from '@lib/routes/makeSearchRoute';

export default Search;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<SearchProps & IBaseProps>
> {
	return {
		props: {},
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
