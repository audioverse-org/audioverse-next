import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { getCollectionDetailPathsData } from '@containers/collection/detail.gql';
import CollectionTeachings, {
	CollectionTeachingsProps,
} from '@containers/collection/teachings';
import { getCollectionTeachingsPageData } from '@containers/collection/teachings.gql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default CollectionTeachings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionTeachingsProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);

	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionTeachingsPageData({ id, first, offset }),
		(d) => d.collection?.recordings.nodes,
		(d) => d.collection?.recordings.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'conferencesTeachings__title',
					defaultMessage: 'Teachings from {conferenceName}',
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
			`/${languageRoute}/conferences/${node.id}/teachings/page/1`
	);
}
