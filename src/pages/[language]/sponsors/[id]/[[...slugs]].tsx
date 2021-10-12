import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
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
	GetStaticPropsResult<SponsorDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { sponsor } = await getSponsorDetailPageData({ id }).catch(() => ({
		sponsor: null,
	}));
	return {
		props: {
			sponsor,
			title: sponsor?.title,
		},
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
