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
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default SponsorDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<SponsorDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { sponsor } = await getSponsorDetailPageData({ id }).catch(() => ({
		sponsor: null,
	}));
	if (sponsor?.language !== getLanguageIdByRoute(params?.language)) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			sponsor,
			title: sponsor?.title,
			canonicalUrl: sponsor?.canonicalUrl,
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
