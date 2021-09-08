import _ from 'lodash';

import Audiobooks, { AudiobooksProps } from '@containers/audiobook/list';
import { LANGUAGES } from '@lib/constants';
import {
	getAudiobookListPageData,
	GetAudiobookListPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { formatPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Audiobooks;

export type AudiobooksStaticProps = StaticProps<AudiobooksProps>;

export interface GetStaticPropsArgs {
	params: { language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<AudiobooksStaticProps> {
	const language = getLanguageIdByRoute(params.language);
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

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: _.values(LANGUAGES).map((l) => `/${l.base_url}/books`),
		fallback: true,
	};
}
