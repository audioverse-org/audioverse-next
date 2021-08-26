import PresenterDetail from '@containers/presenter/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getPresenterDetailPageData,
	GetPresenterDetailPageDataQuery,
	getPresenterDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makePresenterDetailRoute } from '@lib/routes';

export default PresenterDetail;

export type PresenterStaticProps = StaticProps<GetPresenterDetailPageDataQuery>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<PresenterStaticProps> {
	const { id, language } = params;
	return {
		props: await getPresenterDetailPageData({
			id,
			language: getLanguageIdByRoute(language),
		}).catch(() => ({
			person: null,
			sequences: {
				nodes: [],
				pageInfo: {
					hasNextPage: false,
				},
			},
			collections: {
				nodes: [],
				pageInfo: {
					hasNextPage: false,
				},
			},
		})),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getPresenterDetailPathsData,
		(d) => d.persons.nodes,
		(l, n) => makePresenterDetailRoute(l, n.id)
	);
}
