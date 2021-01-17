import SeriesDetail, { SeriesDetailProps } from '@containers/series/detail';
import {
	getSeriesDetailData,
	getSeriesDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

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
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSeriesDetailPathsData,
		'serieses.nodes',
		(node, baseUrl) => `/${baseUrl}/series/${node.id}`
	);
}
