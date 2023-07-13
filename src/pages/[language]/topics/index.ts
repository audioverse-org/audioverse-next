import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getTopicListData,
	GetTopicListDataQuery,
} from '~src/containers/topic/__generated__/list';
import Topics from '~src/containers/topic/list';
import { REVALIDATE } from '~src/lib/constants';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '~src/lib/getLanguageRoutes';
import root from '~src/lib/routes';

export default Topics;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
}>): Promise<GetStaticPropsResult<GetTopicListDataQuery>> {
	const language = getLanguageIdByRoute(params?.language);

	return {
		props: await getTopicListData({
			language,
		}),
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((l) => root.lang(l).topics.get()),
		fallback: 'blocking',
	};
}
