import SponsorTeachings, {
	SponsorTeachingsProps,
} from '@containers/sponsor/teachings';
import {
	getSponsorTeachingsPageData,
	getSponsorTeachingsPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorTeachingsRoute } from '@lib/routes';

export default SponsorTeachings;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorTeachingsProps>> {
	const { language, id } = params;
	const result = await getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorTeachingsPageData({ id, offset, first }),
		(d) => d.sponsor?.recordings.nodes,
		(d) => d.sponsor?.recordings.aggregate?.count
	);

	return {
		...result,
		props: {
			rssPath: `/${language}/sponsors/${id}/teachings.xml`,
			...result.props,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorTeachingsPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorTeachingsRoute(l, n.id)
	);
}
