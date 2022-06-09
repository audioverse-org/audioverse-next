import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SponsorTeachings, {
	SponsorTeachingsProps,
} from '@containers/sponsor/teachings';
import {
	getSponsorTeachingsPageData,
	getSponsorTeachingsPathsData,
} from '@containers/sponsor/teachings.gql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SponsorTeachings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorTeachingsProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorTeachingsPageData({ id, offset, first }),
		(d) => d.sponsor?.recordings.nodes,
		(d) => d.sponsor?.recordings.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'sponsorsTeachings__title',
					defaultMessage: 'Teachings by {sponsorName}',
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
		getSponsorTeachingsPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => `/${l}/sponsors/${n.id}/teachings/page/1`
	);
}
