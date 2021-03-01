import ConferenceDetail from '@containers/conference/detail';
import {
	getConferenceDetailPageData,
	GetConferenceDetailPageDataQuery,
	getConferenceDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeConferenceRoute } from '@lib/routes';
import writeFeedFile from '@lib/writeFeedFile';

export default ConferenceDetail;

type Recording = NonNullable<
	NonNullable<
		GetConferenceDetailPageDataQuery['conference']
	>['recordings']['nodes']
>[0];
export type ConferenceStaticProps = PaginatedStaticProps<
	GetConferenceDetailPageDataQuery,
	Recording
> & { props: { rssPath: string } };

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<ConferenceStaticProps> {
	const { id } = params;

	const staticProps = await getPaginatedStaticProps(
		params,
		async ({ offset, first }) =>
			getConferenceDetailPageData({ id, offset, first }),
		(d) => d.conference?.recordings.nodes,
		(d) => d.conference?.recordings.aggregate?.count
	);

	// TODO: Standardize on an RSS feed naming convention
	// TODO: Only generate feed on page 1 !!BUG
	await writeFeedFile({
		recordings: staticProps.props.nodes,
		title: `${staticProps.props.data?.conference?.title} : AudioVerse`,
		projectRelativePath: `public/en/conferences/${staticProps.props.data?.conference?.id}.xml`,
	});

	return {
		...staticProps,
		props: {
			...staticProps.props,
			rssPath: `/en/conferences/${staticProps.props.data?.conference?.id}.xml`,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getConferenceDetailPathsData,
		(d) => d.conferences.nodes,
		(languageRoute, node) => makeConferenceRoute(languageRoute, node.id, 1)
	);
}
