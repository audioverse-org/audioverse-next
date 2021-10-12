import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import SponsorDetail, { SponsorDetailProps } from '@containers/sponsor/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSponsorDetailPageData,
	getSponsorDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default SponsorDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<SponsorDetailProps>
> {
	const id = params?.id as string;
	return {
		props: await getSponsorDetailPageData({ id }).catch(() => ({
			sponsor: null,
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSponsorDetailPathsData,
		(d) => d.sponsors.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
