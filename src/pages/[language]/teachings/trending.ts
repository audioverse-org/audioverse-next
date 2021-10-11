import { GetStaticPathsResult } from 'next';

import TrendingTeachings from '@containers/sermon/trending';
import { TrendingTeachingsProps } from '@containers/sermon/trending';
import { REVALIDATE } from '@lib/constants';
import { getTrendingTeachingsPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeTrendingSermonRoute } from '@lib/routes';

export default TrendingTeachings;

interface GetStaticPropsArgs {
	params: { language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<TrendingTeachingsProps>> {
	const language = getLanguageIdByRoute(params.language);

	const { recordings } = await getTrendingTeachingsPageData({
		language,
	}).catch(() => ({
		recordings: { nodes: null },
	}));

	return { props: recordings, revalidate: REVALIDATE };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const baseRoutes = getLanguageRoutes();
	return {
		paths: baseRoutes.map(makeTrendingSermonRoute),
		fallback: false,
	};
}
