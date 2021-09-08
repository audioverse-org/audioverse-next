import Sponsors, { SponsorsProps } from '@containers/sponsor/list';
import {
	getSponsorListPageData,
	getSponsorListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Sponsors;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<StaticProps<SponsorsProps>> {
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
		(d) => d.sponsors.aggregate?.count
	);
}
