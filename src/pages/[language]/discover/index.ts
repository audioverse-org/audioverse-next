import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { DehydratedState } from 'react-query';

import { prefetchQueries } from '~containers/__generated__/discover';
import { IBaseProps } from '~containers/base';
import Discover from '~containers/discover';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';
import serializableDehydrate from '~src/lib/serializableDehydrate';

export default Discover;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<
		{
			dehydratedState: DehydratedState;
		} & IBaseProps
	>
> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const client = await prefetchQueries({
		getDiscoverRecentTeachings: { language, first: 6, after: null },
		getDiscoverTrendingTeachings: { language, first: 6, after: null },
		getDiscoverFeaturedTeachings: { language, first: 3, after: null },
		getDiscoverStorySeasons: { language, first: 3, after: null },
		getDiscoverConferences: { language, first: 3, after: null },
		getDiscoverBlogPosts: { language, first: 3, after: null },
	});

	return {
		props: {
			title: intl.formatMessage({
				id: 'discover__title',
				defaultMessage: 'Discover',
			}),
			dehydratedState: serializableDehydrate(client),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			root.lang(base_url).discover.get()
		),
		fallback: false,
	};
}
