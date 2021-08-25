import CollectionList from '@containers/collection/list';
import {
	getCollectionListPageData,
	GetCollectionListPageDataQuery,
	getCollectionListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default CollectionList;

type Collection = NonNullable<
	GetCollectionListPageDataQuery['collections']['nodes']
>[0];
export type CollectionListStaticProps = PaginatedStaticProps<
	GetCollectionListPageDataQuery,
	Collection
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<CollectionListStaticProps> {
	return getPaginatedStaticProps(
		params,
		getCollectionListPageData,
		(d) => d.collections.nodes,
		(d) => d.collections.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'collections',
		getCollectionListPathsData,
		(d) => d?.collections.aggregate?.count
	);
}
