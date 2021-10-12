import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

import Versions, { VersionsProps } from '@containers/bible/versions';
import { REVALIDATE } from '@lib/constants';
import { getBibleVersionsPageData } from '@lib/generated/graphql';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleListRoute } from '@lib/routes';

export default Versions;

export async function getStaticProps(): Promise<
	GetStaticPropsResult<VersionsProps>
> {
	const response = await getBibleVersionsPageData({});

	return {
		props: {
			versions: response?.audiobibles.nodes || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const baseRoutes = getLanguageRoutes();

	return {
		paths: baseRoutes.map(makeBibleListRoute),
		fallback: false,
	};
}
