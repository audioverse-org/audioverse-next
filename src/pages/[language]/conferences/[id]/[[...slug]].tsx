import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import CollectionDetail, {
	CollectionDetailProps,
} from '@containers/collection/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getCollectionDetailPageData,
	getCollectionDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByLegacyRoute } from '@lib/getLanguageIdByLegacyRoute';

export default CollectionDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<CollectionDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { collection } = await getCollectionDetailPageData({ id }).catch(
		() => ({
			collection: null,
		})
	);
	if (collection?.language !== getLanguageIdByLegacyRoute(params?.language)) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			collection,
			title: collection?.title,
			canonicalUrl: collection?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
