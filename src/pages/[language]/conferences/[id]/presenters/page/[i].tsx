import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

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
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionPresentersProps>
> {
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionPresentersPageData({ id, first, offset }),
		(d) => d.collection?.persons.nodes,
		(d) => d.collection?.persons.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(languageRoute, node) =>
			makeCollectionPresentersRoute(languageRoute, node.id, 1)
	);
}
