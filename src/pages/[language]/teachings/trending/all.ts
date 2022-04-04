import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import TrendingTeachings from '@containers/sermon/trending';
import { TrendingTeachingsProps } from '@containers/sermon/trending';
import { REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import { getTrendingTeachingsPageData } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeTrendingSermonRoute } from '@lib/routes';

export default TrendingTeachings;

export async function trendingStaticProps(
	params: { language: string } | undefined,
	filter: string
): Promise<GetStaticPropsResult<TrendingTeachingsProps & IBaseProps>> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);

	if (!['all', 'audio', 'video'].includes(filter)) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	const { recordings } = await getTrendingTeachingsPageData({
		language,
		hasVideo: filter === 'video' ? true : filter === 'audio' ? false : null,
	}).catch(() => ({
		recordings: { nodes: null },
	}));

	return {
		props: {
			...recordings,
			filter,
			title: intl.formatMessage({
				id: 'trending__title',
				defaultMessage: 'Trending Teachings',
			}),
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<TrendingTeachingsProps & IBaseProps>
> {
	return trendingStaticProps(params, 'all');
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const baseRoutes = getLanguageRoutes();
	return {
		paths: baseRoutes.map((l) => makeTrendingSermonRoute(l)),
		fallback: false,
	};
}
