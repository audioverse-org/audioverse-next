import CollectionList, {
	CollectionListProps,
} from '@containers/collection/list';
import {
	getCollectionListPageData,
	getCollectionListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default CollectionList;

export async function getStaticProps({
	params,
}: {
	params: { language: string; i: string };
}): Promise<StaticProps<CollectionListProps>> {
	return getPaginatedStaticProps(
		params,
		getCollectionListPageData,
		(d) => d.collections.nodes,
		(d) => d.collections.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'conferences',
		getCollectionListPathsData,
		(d) => d?.collections.aggregate?.count
	);
}
