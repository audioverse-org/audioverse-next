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
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorConferencesRoute } from '@lib/routes';

export default SponsorConferences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorConferencesProps>
> {
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorConferencesPageData({ id, ...vars }),
		(d) => d.conferences.nodes,
		(d) => d.conferences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSponsorConferencesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorConferencesRoute(l, n.id)
	);
}
