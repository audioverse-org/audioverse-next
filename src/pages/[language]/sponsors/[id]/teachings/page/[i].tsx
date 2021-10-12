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
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorTeachingsRoute } from '@lib/routes';

export default SponsorTeachings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorTeachingsProps>
> {
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorTeachingsPageData({ id, offset, first }),
		(d) => d.sponsor?.recordings.nodes,
		(d) => d.sponsor?.recordings.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSponsorTeachingsPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorTeachingsRoute(l, n.id)
	);
}
