import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getTopicDetailData,
	GetTopicDetailDataQuery,
	getTopicDetailStaticPaths,
} from '~src/containers/topic/__generated__/detail';
import Topic from '~src/containers/topic/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~src/lib/constants';
import { getDetailStaticPaths } from '~src/lib/getDetailStaticPaths';
import root from '~src/lib/routes';

export default Topic;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	id: string;
}>): Promise<GetStaticPropsResult<GetTopicDetailDataQuery>> {
	if (!params?.id) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: await getTopicDetailData({
			id: params.id,
		}),
		revalidate: REVALIDATE,
	};
}

export function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getTopicDetailStaticPaths,
		(d) => d.topics.nodes,
		(l, n) => root.lang(l).topics.id(n.id).slug(n.title).get()
	);
}
