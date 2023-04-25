import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getSeriesDetailPageData,
	getSeriesDetailPathsData,
} from '~containers/series/__generated__/detail';
import SeriesDetail, { SeriesDetailProps } from '~containers/series/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default SeriesDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<GetStaticPropsResult<SeriesDetailProps & IBaseProps>> {
	const id = params?.id as string;

	const { series } = await getSeriesDetailPageData({ id }).catch(() => ({
		series: null,
	}));
	if (
		series?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			sequence: series,
			title: series?.title,
			canonicalUrl: series?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(_, n) => n.canonicalPath
	);
}
