import Sponsors from '@containers/sponsor/list';
import {
	getSponsorListPageData,
	GetSponsorListPageDataQuery,
	getSponsorListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Sponsors;

type Sponsor = NonNullable<GetSponsorListPageDataQuery['sponsors']['nodes']>[0];
export type SponsorsStaticProps = PaginatedStaticProps<
	GetSponsorListPageDataQuery,
	Sponsor
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<SponsorsStaticProps> {
	return getPaginatedStaticProps(
		params,
		getSponsorListPageData,
		(d) => d.sponsors.nodes,
		(d) => d.sponsors.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'sponsors',
		getSponsorListPathsData,
		(d) => d?.sponsors.aggregate?.count
	);
}
