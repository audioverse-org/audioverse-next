import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSeriesDetailPageData,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByLegacyRoute } from '@lib/getLanguageIdByLegacyRoute';

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
	if (series?.language !== getLanguageIdByLegacyRoute(params?.language)) {
		return {
			notFound: true,
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
