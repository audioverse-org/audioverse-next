import { GetStaticPathsResult } from 'next';

import CollectionSequences, {
	CollectionSequencesProps,
} from '@containers/collection/sequences';
import {
	getCollectionDetailPathsData,
	getCollectionSequencesPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeCollectionSequencesRoute } from '@lib/routes';

export default CollectionSequences;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<CollectionSequencesProps>> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionSequencesPageData({ id, first, offset }),
		(d) => d.collection?.sequences.nodes,
		(d) => d.collection?.sequences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(languageRoute, node) =>
			makeCollectionSequencesRoute(languageRoute, node.id, 1)
	);
}
