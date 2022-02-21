import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SponsorConferences, {
	SponsorConferencesProps,
} from '@containers/sponsor/conferences';
import {
	getSponsorConferencesPageData,
	getSponsorConferencesPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SponsorConferences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorConferencesProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorConferencesPageData({ id, ...vars }),
		(d) => d.collections.nodes,
		(d) => d.collections.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'sponsorsConferences__title',
					defaultMessage: 'Conferences by {sponsorName}',
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
		getSponsorConferencesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => `/${l}/sponsors/${n.id}/conferences/page/1`
	);
}
