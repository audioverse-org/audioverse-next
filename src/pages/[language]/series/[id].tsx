import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import {
	getSeriesDetailData,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSeriesRoute } from '@lib/routes';
import { REVALIDATE } from '@lib/constants';

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

	const { series = undefined } = (await getSeriesDetailData({ id })) || {};

	return {
		props: { series },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		'serieses.nodes',
		(baseUrl, node) => makeSeriesRoute(baseUrl, node.id)
	);
}
