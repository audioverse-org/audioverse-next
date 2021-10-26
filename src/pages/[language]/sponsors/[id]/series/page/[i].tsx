import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SponsorSeries, { SponsorSeriesProps } from '@containers/sponsor/series';
import {
	getSponsorSeriesPageData,
	getSponsorSeriesPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SponsorSeries;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorSeriesProps>
> {
	const id = params?.id as string;
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
		(l, n) => `/${l}/sponsors/${n.id}/series/page/1`
	);
}
