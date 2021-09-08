import SponsorDetail, { SponsorDetailProps } from '@containers/sponsor/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSponsorDetailPageData,
	getSponsorDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorRoute } from '@lib/routes';

export default SponsorDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorDetailProps>> {
	const { id } = params;
	return {
		props: await getSponsorDetailPageData({ id }).catch(() => ({
			sponsor: null,
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorDetailPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorRoute(l, n.id)
	);
}
