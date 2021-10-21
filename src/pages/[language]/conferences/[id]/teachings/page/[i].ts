import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import CollectionTeachings, {
	CollectionTeachingsProps,
} from '@containers/collection/teachings';
import {
	getCollectionDetailPathsData,
	getCollectionTeachingsPageData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeCollectionTeachingsRoute } from '@lib/routes';

export default CollectionTeachings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionTeachingsProps>
> {
	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionTeachingsPageData({ id, first, offset }),
		(d) => d.collection?.recordings.nodes,
		(d) => d.collection?.recordings.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(languageRoute, node) =>
			makeCollectionTeachingsRoute(languageRoute, node.id, 1)
	);
}
