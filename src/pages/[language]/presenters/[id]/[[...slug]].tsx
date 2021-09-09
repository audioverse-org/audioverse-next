import PresenterDetail, {
	PresenterDetailProps,
} from '@containers/presenter/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getPresenterDetailPageData,
	getPresenterDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default PresenterDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<StaticProps<PresenterDetailProps>> {
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
		(l, { canonicalPath }) => canonicalPath
	);
}
