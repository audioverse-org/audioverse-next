import CollectionDetail from '@containers/collection/detail';
import {
	getCollectionDetailPathsData,
	getCollectionRecordingsPageData,
	GetCollectionRecordingsPageDataQuery,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import { makeConferenceRecordingsRoute } from '@lib/routes';
import writeFeedFile from '@lib/writeFeedFile';

export default CollectionDetail; // TODO: change this to Conference recordings pivot view instead of detail view

type Collection = NonNullable<
	NonNullable<
		GetCollectionRecordingsPageDataQuery['collection']
	>['recordings']['nodes']
>[0];
export type CollectionStaticProps = PaginatedStaticProps<
	GetCollectionRecordingsPageDataQuery,
	Collection
> & { props: { rssPath: string } };

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<CollectionStaticProps> {
	const { id } = params;

	const staticProps = await getPaginatedStaticProps(
		params,
		async ({ offset, first }) =>
			getCollectionRecordingsPageData({ id, offset, first }),
		(d) => d.collection?.recordings.nodes,
		(d) => d.collection?.recordings.aggregate?.count
	);

	// TODO: Switch to createFeed function
	// TODO: Only generate feed on page 1 !!BUG
	await writeFeedFile({
		recordings: staticProps.props.nodes,
		title: `${staticProps.props.data?.collection?.title} : AudioVerse`,
		projectRelativePath: `public/en/conferences/${staticProps.props.data?.collection?.id}.xml`,
	});

	// TODO: Set feed url using language route
	return {
		...staticProps,
		props: {
			...staticProps.props,
			rssPath: `/en/conferences/${staticProps.props.data?.collection?.id}.xml`,
		},
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(languageRoute, node) =>
			makeConferenceRecordingsRoute(languageRoute, node.id, 1)
	);
}
