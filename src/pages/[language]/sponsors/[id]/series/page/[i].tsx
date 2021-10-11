import { GetStaticPathsResult } from 'next';

import SponsorSeries, { SponsorSeriesProps } from '@containers/sponsor/series';
import {
	getSponsorSeriesPageData,
	getSponsorSeriesPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorSeriesRoute } from '@lib/routes';

export default SponsorSeries;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorSeriesProps>> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorSeriesPageData({ ...vars, id }),
		(d) => d.sequences.nodes,
		(d) => d.sequences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSponsorSeriesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorSeriesRoute(l, n.id)
	);
}
