import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getSponsorDetailPageData,
	getSponsorDetailPathsData,
} from '~containers/sponsor/__generated__/detail';
import SponsorDetail, { SponsorDetailProps } from '~containers/sponsor/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

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
	if (
		sponsor?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
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
		(l, { canonicalPath }) => canonicalPath,
	);
}
