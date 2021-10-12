import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Discover, { DiscoverProps } from '@containers/discover';
import { REVALIDATE } from '@lib/constants';
import { getDiscoverPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';

export default Discover;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<DiscoverProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	return {
		props: await getDiscoverPageData({ language }).catch(() => ({
			conferences: {
				nodes: [],
			},
			recentTeachings: {
				nodes: [],
			},
			storySeasons: {
				nodes: [],
			},
			trendingTeachings: {
				nodes: [],
			},
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => `/${base_url}/discover`),
		fallback: false,
	};
}
