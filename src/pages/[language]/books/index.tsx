import _ from 'lodash';

import Audiobooks from '@containers/audiobook/list';
import { LANGUAGES } from '@lib/constants';
import {
	getAudiobookListPageData,
	GetAudiobookListPageDataQuery,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import {
	formatPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';

export default Audiobooks;

type Audiobook = NonNullable<
	GetAudiobookListPageDataQuery['audiobooks']['nodes']
>[0];
export type AudiobooksStaticProps = PaginatedStaticProps<
	GetAudiobookListPageDataQuery,
	Audiobook
>;

export interface GetStaticPropsArgs {
	params: { language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<AudiobooksStaticProps> {
	const language = getLanguageIdByRoute(params.language);
	const result = await getAudiobookListPageData({ language }).catch(() => ({
		audiobooks: { nodes: [], aggregate: { count: 0 } },
	}));
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
