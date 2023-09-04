import { DehydratedState } from '@tanstack/react-query';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { REVALIDATE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';
import { prefetchQueries } from '~src/__generated__/prefetch';
import Discover from '~src/containers/discover';
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
		getSectionRecentTeachings: { language },
		getSectionTrendingTeachings: { language },
		getSectionFeaturedTeachings: { language },
		getSectionStorySeasons: { language },
		getSectionConferences: { language },
		getSectionBlogPosts: { language },
		getSectionTopics: { language },
		getSectionPresenters: { language },
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
