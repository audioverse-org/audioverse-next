import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SponsorSeries, { SponsorSeriesProps } from '@containers/sponsor/series';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import {
	getSponsorSeriesPageData,
	getSponsorSeriesPathsData,
} from '@containers/sponsor/__generated__/series';

export default SponsorSeries;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorSeriesProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorSeriesPageData({ ...vars, id }),
		(d) => d.sequences.nodes,
		(d) => d.sequences.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'sponsorsSequences__title',
					defaultMessage: 'Series by {sponsorName}',
				},
				{
					sponsorName: d?.sponsor?.title,
				}
			),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSponsorSeriesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => `/${l}/sponsors/${n.id}/series/page/1`
	);
}
