import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import AudiobookDetail, {
	AudiobookDetailProps,
} from '@containers/audiobook/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default AudiobookDetail;

type AudiobookStaticProps = GetStaticPropsResult<AudiobookDetailProps>;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<AudiobookStaticProps> {
	const id = params?.id as string;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));

	return {
		props: {
			sequence,
			title: sequence?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getAudiobookDetailPathsData,
		(d) => d.audiobooks.nodes,
		(l, { canonicalPath }) => canonicalPath
	);
}
