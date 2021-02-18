import Audiobooks, { AudiobooksProps } from '@containers/audiobook/audiobooks';
import {
	getAudiobookListPageData,
	getAudiobookListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default Audiobooks;

interface StaticProps {
	props: AudiobooksProps;
	revalidate: number;
}

export interface GetStaticPropsArgs {
	params: { i: string; language: string };
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	return getPaginatedStaticProps(
		params,
		getAudiobookListPageData,
		'audiobooks.nodes',
		'audiobooks.aggregate.count'
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths('books', async (language) => {
		const data = await getAudiobookListPathsData({ language });

		return data.audiobooks.aggregate?.count || 0;
	});
}
