import SponsorTeachings from '@containers/sponsor/teachings';
import { createFeed } from '@lib/createFeed';
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
> & { props: { rssPath: string } };

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorTeachingsStaticProps> {
	const { language, id, i } = params;
	const result = await getPaginatedStaticProps(
		params,
		({ offset, first }) => getSponsorTeachingsPageData({ id, offset, first }),
		(d) => d.sponsor?.recordings.nodes,
		(d) => d.sponsor?.recordings.aggregate?.count
	);

	if (i === '1') {
		await createFeed(
			result.props.data?.sponsor?.title,
			params,
			result.props.nodes,
			`sponsors/${id}/teachings.xml`
		);
	}

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
