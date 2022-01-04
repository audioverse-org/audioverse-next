import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

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
}: GetStaticPropsContext<{ language: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionListProps>
> {
	return getPaginatedStaticProps(
		params,
		getCollectionListPageData,
		(d) => d.conferences.nodes,
		(d) => d.conferences.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'conferences',
		getCollectionListPathsData,
		(d) => d?.conferences.aggregate?.count
	);
}
