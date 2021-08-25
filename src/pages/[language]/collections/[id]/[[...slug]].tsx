import CollectionDetail from '@containers/collection/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getCollectionDetailPageData,
	GetCollectionDetailPageDataQuery,
	getCollectionDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeCollectionRoute } from '@lib/routes';

export default CollectionDetail;

export type CollectionStaticProps =
	StaticProps<GetCollectionDetailPageDataQuery>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<CollectionStaticProps> {
	const { id } = params;
	return {
		props: await getCollectionDetailPageData({ id }).catch(() => ({
			collection: null,
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getCollectionDetailPathsData,
		(d) => d.collections.nodes,
		(l, n) => makeCollectionRoute(l, n.id)
	);
}
