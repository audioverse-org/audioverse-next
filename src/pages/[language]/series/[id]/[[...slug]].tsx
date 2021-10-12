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
import { makeSeriesDetailRoute } from '@lib/routes';

export default SeriesDetail;

export type SeriesStaticProps = GetStaticPropsResult<SeriesDetailProps>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<SeriesStaticProps & IBaseProps> {
	const id = params?.id as string;

	const { series } = await getSeriesDetailPageData({ id }).catch(() => ({
		series: null,
	}));

	return {
		props: {
			sequence: series,
			title: series?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(l, n) => makeSeriesDetailRoute(l, n.id)
	);
}
