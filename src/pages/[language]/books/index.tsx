import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import AudiobooksList, {
	AudiobooksListProps,
} from '@containers/audiobook/list';
import {
	getAudiobookListPageData,
	GetAudiobookListPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { formatPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeAudiobookListRoute } from '@lib/routes';

export default AudiobooksList;

export type AudiobooksStaticProps = GetStaticPropsResult<AudiobooksListProps>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
}>): Promise<AudiobooksStaticProps> {
	const language = getLanguageIdByRoute(params?.language);
	const result = await getAudiobookListPageData({ language }).catch(
		() =>
			({
				audiobooks: { nodes: [], aggregate: { count: 0 } },
			} as GetAudiobookListPageDataQuery)
	);
	const audiobooks = result.audiobooks;
	return formatPaginatedStaticProps(
		result,
		audiobooks.nodes || [],
		audiobooks.aggregate?.count || 0
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			makeAudiobookListRoute(base_url)
		),
		fallback: 'blocking',
	};
}
