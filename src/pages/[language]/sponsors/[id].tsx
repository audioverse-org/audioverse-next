import Sponsor from '@containers/sponsor/detail';
import {
	getSponsorDetailPageData,
	GetSponsorDetailPageDataQuery,
	getSponsorDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeSponsorRoute } from '@lib/routes';

export default Sponsor;

type Recording = NonNullable<
	NonNullable<GetSponsorDetailPageDataQuery['sponsor']>['recordings']['nodes']
>[0];
export type SponsorStaticProps = PaginatedStaticProps<
	GetSponsorDetailPageDataQuery,
	Recording
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorStaticProps> {
	const { id } = params;
	// TODO: Stop returning paginated props, just return sponsor meta
	return getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorDetailPageData({ id, offset, first }),
		(d) => d?.sponsor?.recordings.nodes,
		(d) => d?.sponsor?.recordings.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorDetailPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorRoute(l, n.id)
	);
}
