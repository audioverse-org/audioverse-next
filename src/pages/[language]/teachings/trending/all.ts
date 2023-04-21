import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { getTrendingTeachingsPageData } from '~containers/sermon/__generated__/trending';
import TrendingTeachings, {
	TrendingTeachingsProps,
} from '~containers/sermon/trending';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';

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
		paths: baseRoutes.map((l) => root.lang(l).teachings.trending.all.get()),
		fallback: false,
	};
}
