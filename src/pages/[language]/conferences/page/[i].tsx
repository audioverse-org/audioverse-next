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
} from '@containers/collection/list.gql';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default CollectionList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionListProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getCollectionListPageData,
		(d) => d.conferences.nodes,
		(d) => d.conferences.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'conferences__title',
				defaultMessage: 'All Conferences',
			}),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'conferences',
		getCollectionListPathsData,
		(d) => d?.conferences.aggregate?.count
	);
}
