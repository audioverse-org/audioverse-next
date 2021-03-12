import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import {
	getSponsorConferencesPageData,
	GetSponsorConferencesPageDataQuery,
	getSponsorConferencesPathsData,
} from '@lib/generated/graphql';
import SponsorConferences from '@containers/sponsor/conferences';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorConferencesRoute } from '@lib/routes';

export default SponsorConferences;

type Conference = NonNullable<
	GetSponsorConferencesPageDataQuery['conferences']['nodes']
>[0];
export type SponsorConferencesStaticProps = PaginatedStaticProps<
	GetSponsorConferencesPageDataQuery,
	Conference
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorConferencesStaticProps> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorConferencesPageData({ id, ...vars }),
		(d) => d.conferences.nodes,
		(d) => d.conferences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorConferencesPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorConferencesRoute(l, n.id)
	);
}
