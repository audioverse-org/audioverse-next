import { GetStaticPathsResult } from 'next';

import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSeriesDetailPageData,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSeriesDetailRoute } from '@lib/routes';

export default SeriesDetail;

export type SeriesStaticProps = StaticProps<SeriesDetailProps>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<SeriesStaticProps> {
	const { id } = params;

	const { series } = await getSeriesDetailPageData({ id }).catch(() => ({
		series: null,
	}));

	return {
		props: {
			sequence: series,
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
