import Sponsor from '@containers/sponsor/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSponsorDetailPageData,
	GetSponsorDetailPageDataQuery,
	getSponsorDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorRoute } from '@lib/routes';

export default Sponsor;

export type SponsorStaticProps = StaticProps<GetSponsorDetailPageDataQuery>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorStaticProps> {
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
