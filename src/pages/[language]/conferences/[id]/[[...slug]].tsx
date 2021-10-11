import { GetStaticPathsResult } from 'next';

import CollectionDetail, {
	CollectionDetailProps,
} from '@containers/collection/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getCollectionDetailPageData,
	getCollectionDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default CollectionDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<CollectionDetailProps>> {
	const { id } = params;
	return {
		props: await getCollectionDetailPageData({ id }).catch(() => ({
			collection: null,
		})),
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
