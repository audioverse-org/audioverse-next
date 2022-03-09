import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Discover, { DiscoverProps } from '@containers/discover';
import { REVALIDATE } from '@lib/constants';
import { getDiscoverPageData } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeDiscoverRoute } from '@lib/routes';

export default Discover;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<DiscoverProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	return {
		props: {
			...(await getDiscoverPageData({ language }).catch(() => ({
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
				blogPosts: {
					nodes: [],
				},
			}))),
			title: intl.formatMessage({
				id: 'discover__title',
				defaultMessage: 'Discover',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) => makeDiscoverRoute(base_url)),
		fallback: false,
	};
}
