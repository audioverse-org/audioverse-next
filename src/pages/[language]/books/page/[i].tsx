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
	getAudiobookListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default AudiobooksList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	i: string;
	language: string;
}>): Promise<GetStaticPropsResult<AudiobooksListProps>> {
	return getPaginatedStaticProps(
		params,
		getAudiobookListPageData,
		(d) => d.audiobooks.nodes,
		(d) => d.audiobooks.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'books',
		getAudiobookListPathsData,
		(d) => d.audiobooks.aggregate?.count
	);
}
