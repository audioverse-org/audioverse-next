import { GetStaticPathsResult, GetStaticPropsContext } from 'next';

import AudiobooksList from '@containers/audiobook/list';
import {
	getAudiobookListPageData,
	getAudiobookListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

import { AudiobooksStaticProps } from '../index';

export default AudiobooksList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	i: string;
	language: string;
}>): Promise<AudiobooksStaticProps> {
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
