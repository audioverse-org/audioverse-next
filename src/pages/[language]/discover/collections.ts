import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import DiscoverCollections, {
	IDiscoverCollectionsProps,
} from '@containers/discover/collections';
import { REVALIDATE } from '@lib/constants';
import { getDiscoverCollectionsPageData } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import root from '@lib/routes';

export default DiscoverCollections;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<IDiscoverCollectionsProps & IBaseProps>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	return {
		props: {
			...(await getDiscoverCollectionsPageData({ language }).catch(() => ({
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
				websiteFeaturedCollection: null,
				serieses: {
					nodes: [],
				},
				sponsors: {
					nodes: [],
				},
				storySeasons: {
					nodes: [],
				},
			}))),
			title: intl.formatMessage({
				id: 'discoverCollections__title',
				defaultMessage: 'Discover Collections',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).discover.collections.get()
		),
		fallback: false,
	};
}
