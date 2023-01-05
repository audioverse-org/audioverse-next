import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import CollectionPresenters, {
	CollectionPresentersProps,
} from '@/containers/collection/presenters';
import {
	getCollectionDetailPathsData,
	getCollectionPresentersPageData,
} from '@/lib/generated/graphql';
import { getDetailStaticPaths } from '@/lib/getDetailStaticPaths';
import getIntl from '@/lib/getIntl';
import { getPaginatedStaticProps } from '@/lib/getPaginatedStaticProps';

export default CollectionPresenters;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string; i: string }>): Promise<
	GetStaticPropsResult<CollectionPresentersProps>
> {
	const languageRoute = params?.language as string;
	const intl = await getIntl(languageRoute);

	const id = params?.id as string;
	return getPaginatedStaticProps(
		params,
		({ first, offset }) =>
			getCollectionPresentersPageData({ id, first, offset }),
		(d) => d.collection?.persons.nodes,
		(d) => d.collection?.persons.aggregate?.count,
		(d) => ({
			title: intl.formatMessage(
				{
					id: 'conferencesPresenters__title',
					defaultMessage: 'Presenters from {conferenceName}',
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
			`/${languageRoute}/conferences/${node.id}/presenters/page/1`
	);
}
