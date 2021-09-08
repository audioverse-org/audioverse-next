import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import { REVALIDATE } from '@lib/constants';
import { createFeed } from '@lib/createFeed';
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

	const result = await getSeriesDetailPageData({ id }).catch(() => ({
		series: null,
	}));

	if (result) {
		await createFeed(
			result.series?.title,
			params,
			result.series?.recordings.nodes || [],
			`series/${id}.xml`
		);
	}
	return {
		props: {
			sequence: result?.series,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(l, n) => makeSeriesDetailRoute(l, n.id)
	);
}
