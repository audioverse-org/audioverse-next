import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import DiscoverCollections, {
	IDiscoverCollectionsProps,
} from '@containers/discover/collections';
import { REVALIDATE } from '@lib/constants';
import { getDiscoverCollectionsPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeDiscoverCollectionsRoute } from '@lib/routes';

export default DiscoverCollections;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<IDiscoverCollectionsProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	return {
		props: await getDiscoverCollectionsPageData({ language }).catch(() => ({
			audiobooks: {
				nodes: [],
			},
			conferences: {
				nodes: [],
			},
			musicAlbums: {
				nodes: [],
			},
			persons: {
				nodes: [],
			},
			collection: null,
			serieses: {
				nodes: [],
			},
			sponsors: {
				nodes: [],
			},
			storySeasons: {
				nodes: [],
			},
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			makeDiscoverCollectionsRoute(base_url)
		),
		fallback: false,
	};
}
