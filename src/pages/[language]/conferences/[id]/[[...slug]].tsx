import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import CollectionDetail, {
	CollectionDetailProps,
} from '@containers/collection/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '@lib/constants';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import {
	getCollectionDetailPageData,
	getCollectionDetailPathsData,
} from '@containers/collection/__generated__/detail';

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
	if (
		collection?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
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
