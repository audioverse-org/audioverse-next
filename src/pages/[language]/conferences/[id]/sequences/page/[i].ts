import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import CollectionSequences, {
	CollectionSequencesProps,
} from '@containers/collection/sequences';
import {
	getCollectionDetailPathsData,
	getCollectionSequencesPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default CollectionSequences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionSequencesProps>
> {
	const id = params?.id as string;
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
			`/${languageRoute}/conferences/${node.id}/sequences/page/1`
	);
}
