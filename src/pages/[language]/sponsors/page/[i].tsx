import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import Sponsors, { SponsorsProps } from '@containers/sponsor/list';
import {
	getSponsorListPageData,
	getSponsorListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Sponsors;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorsProps>
> {
	return getPaginatedStaticProps(
		params,
		getSponsorListPageData,
		(d) => d.sponsors.nodes,
		(d) => d.sponsors.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'sponsors',
		getSponsorListPathsData,
		(d) => d.sponsors.aggregate?.count
	);
}
