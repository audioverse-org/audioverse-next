import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Search, { SearchProps } from '@containers/search';
import { REVALIDATE } from '@lib/constants';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSearchRoute } from '@lib/routes/makeSearchRoute';

export default Search;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<SearchProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	return {
		props: {
			language,
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
