import SeriesDetail from '@containers/series/detail';
import { REVALIDATE } from '@lib/constants';
import { createFeed } from '@lib/createFeed';
import {
	getSeriesDetailPageData,
	GetSeriesDetailPageDataQuery,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSeriesDetailRoute } from '@lib/routes';

export default SeriesDetail;

export type SeriesStaticProps = StaticProps<GetSeriesDetailPageDataQuery>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<SeriesStaticProps> {
	const { id } = params;

	const result = await getSeriesDetailPageData({ id }).catch(() => ({
		sequence: null,
	}));

	if (result) {
		await createFeed(
			result.sequence?.title,
			params,
			result.sequence?.recordings.nodes || [],
			`series/${id}.xml`
		);
	}
	return {
		props: result,
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.sequences.nodes,
		(l, n) => makeSeriesDetailRoute(l, n.id)
	);
}
