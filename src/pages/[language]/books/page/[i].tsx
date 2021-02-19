import Audiobooks from '@containers/audiobook/audiobooks';
import {
	getAudiobookListPageData,
	GetAudiobookListPageDataQuery,
	getAudiobookListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import {
	getPaginatedStaticProps,
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
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<AudiobooksStaticProps> {
	return getPaginatedStaticProps(
		params,
		getAudiobookListPageData,
		(d) => d.audiobooks.nodes,
		(d) => d.audiobooks.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('books', async (language) => {
		const data = await getAudiobookListPathsData({ language });

		return data.audiobooks.aggregate?.count || 0;
	});
}
