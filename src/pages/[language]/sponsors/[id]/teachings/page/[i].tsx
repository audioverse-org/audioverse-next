import SponsorTeachings from '@containers/sponsor/teachings';
import {
	getSponsorTeachingsPageData,
	GetSponsorTeachingsPageDataQuery,
	getSponsorTeachingsPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeSponsorTeachingsRoute } from '@lib/routes';

export default SponsorTeachings;

type Teaching = NonNullable<
	NonNullable<
		GetSponsorTeachingsPageDataQuery['sponsor']
	>['recordings']['nodes']
>[0];
export type SponsorTeachingsStaticProps = PaginatedStaticProps<
	GetSponsorTeachingsPageDataQuery,
	Teaching
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorTeachingsStaticProps> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorTeachingsPageData({ id, offset, first }),
		(d) => d?.sponsor?.recordings.nodes,
		(d) => d?.sponsor?.recordings.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorTeachingsPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorTeachingsRoute(l, n.id)
	);
}
