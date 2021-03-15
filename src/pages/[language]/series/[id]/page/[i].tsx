import SeriesDetail from '@containers/series/detail';
import {
	getSeriesDetailData,
	GetSeriesDetailDataQuery,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSeriesDetailRoute } from '@lib/routes';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default SeriesDetail;

type Series = NonNullable<
	NonNullable<GetSeriesDetailDataQuery['series']>['recordings']['nodes']
>[0];
export type SeriesDetailStaticProps = PaginatedStaticProps<
	GetSeriesDetailDataQuery,
	Series
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SeriesDetailStaticProps> {
	const { id } = params;

	return getPaginatedStaticProps(
		params,
		({ offset, first }) => getSeriesDetailData({ id, offset, first }),
		(d) => d.series?.recordings.nodes,
		(d) => d.series?.recordings.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(baseUrl, node) => makeSeriesDetailRoute(baseUrl, node.id)
	);
}
