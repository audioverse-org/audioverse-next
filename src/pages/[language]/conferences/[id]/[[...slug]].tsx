import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getCollectionDetailPageData,
	getCollectionDetailPathsData,
} from '~containers/collection/__generated__/detail';
import CollectionDetail, {
	CollectionDetailProps,
} from '~containers/collection/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default CollectionDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<CollectionDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { collection } = await getCollectionDetailPageData({
		id,
		first: 20,
		after: null,
	}).catch(() => ({
		collection: null,
	}));
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
			endCursor: collection?.recordings.pageInfo.endCursor ?? null,
			hasNextPage: collection?.recordings.pageInfo.hasNextPage ?? false,
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
