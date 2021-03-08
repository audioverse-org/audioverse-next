import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSeriesDetailData,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSeriesRoute } from '@lib/routes';

export default SeriesDetail;

interface StaticProps {
	props: SeriesDetailProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<StaticProps> {
	const { id } = params;

	// TODO: try/catch errors to ensure proper 404 page is displayed
	const { series = undefined } = (await getSeriesDetailData({ id })) || {};

	return {
		props: { series },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		(d) => d.serieses.nodes,
		(baseUrl, node) => makeSeriesRoute(baseUrl, node.id)
	);
}
