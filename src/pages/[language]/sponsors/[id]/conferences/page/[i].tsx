import SponsorConferences, {
	SponsorConferencesProps,
} from '@containers/sponsor/conferences';
import {
	getSponsorConferencesPageData,
	getSponsorConferencesPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorConferencesRoute } from '@lib/routes';

export default SponsorConferences;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorConferencesProps>> {
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
