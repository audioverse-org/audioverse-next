import SeriesDetail from '@containers/series/detail';
import { createFeed } from '@lib/createFeed';
import {
	getSeriesDetailData,
	GetSeriesDetailDataQuery,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeSeriesDetailRoute } from '@lib/routes';

export default SeriesDetail;

type Series = NonNullable<
	NonNullable<GetSeriesDetailDataQuery['series']>['recordings']['nodes']
>[0];
export type SeriesDetailStaticProps = PaginatedStaticProps<
	GetSeriesDetailDataQuery,
	Series
> & { props: { rssUrl: string } };

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SeriesDetailStaticProps> {
	const { language, id, i } = params;

	const result = await getPaginatedStaticProps(
		params,
		({ offset, first }) => getSeriesDetailData({ id, offset, first }),
		(d) => d.series?.recordings.nodes,
		(d) => d.series?.recordings.aggregate?.count
	);

	if (i === '1') {
		await createFeed(
			result.props.data?.series?.title,
			params,
			result.props.nodes,
			`series/${id}.xml`
		);
	}

	return {
		...result,
		props: {
			...result.props,
			rssUrl: `/${language}/series/${id}.xml`,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(baseUrl, node) => makeSeriesDetailRoute(baseUrl, node.id)
	);
}
