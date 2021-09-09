import CollectionPresenters, {
	CollectionPresentersProps,
} from '@containers/collection/presenters';
import {
	getCollectionDetailPathsData,
	getCollectionPresentersPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeCollectionPresentersRoute } from '@lib/routes';

export default CollectionPresenters;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<CollectionPresentersProps>> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionPresentersPageData({ id, first, offset }),
		(d) => d.collection?.persons.nodes,
		(d) => d.collection?.persons.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(languageRoute, node) =>
			makeCollectionPresentersRoute(languageRoute, node.id, 1)
	);
}
