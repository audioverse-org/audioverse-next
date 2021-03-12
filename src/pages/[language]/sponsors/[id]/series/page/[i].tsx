import SponsorSeries from '@containers/sponsor/series';
import {
	getSponsorSeriesPageData,
	GetSponsorSeriesPageDataQuery,
	getSponsorSeriesPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeSponsorSeriesRoute } from '@lib/routes';

export default SponsorSeries;

type Series = NonNullable<
	GetSponsorSeriesPageDataQuery['serieses']['nodes']
>[0];
export type SponsorSeriesStaticProps = PaginatedStaticProps<
	GetSponsorSeriesPageDataQuery,
	Series
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorSeriesStaticProps> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorSeriesPageData({ ...vars, id }),
		(d) => d.serieses.nodes,
		(d) => d.serieses.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorSeriesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorSeriesRoute(l, n.id)
	);
}
