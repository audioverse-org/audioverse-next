import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import CollectionSequences, {
	CollectionSequencesProps,
} from '@containers/collection/sequences';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { getCollectionDetailPathsData } from '@containers/collection/__generated__/detail';
import { getCollectionSequencesPageData } from '@containers/collection/__generated__/sequences';

export default CollectionSequences;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionSequencesProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);

	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionSequencesPageData({ id, first, offset }),
		(d) => d.collection?.sequences.nodes,
		(d) => d.collection?.sequences.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'conferencesSequences__title',
					defaultMessage: 'Series from {conferenceName}',
				},
				{
					conferenceName: d?.collection?.title,
				}
			),
		})
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
