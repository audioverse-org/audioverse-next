import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Give from '@containers/give';
import { REVALIDATE } from '@lib/constants';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeDonateRoute } from '@lib/routes';

export default Give;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<Record<string, unknown>>
> {
	return {
		props: {},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeDonateRoute(base_url)),
		fallback: false,
	};
}
