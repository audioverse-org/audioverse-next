import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import AudiobookTrackDetail, {
	AudiobookTrackDetailProps,
} from '@containers/audiobook/tracks/detail';
import { IBaseProps } from '@containers/base';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookTrackDetailData,
	getAudiobookTrackDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default AudiobookTrackDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<AudiobookTrackDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { audiobookTrack: recording } = await getAudiobookTrackDetailData({
		id,
	}).catch(() => ({
		audiobookTrack: null,
	}));

	return {
		props: {
			recording,
			title: recording?.title,
			canonicalUrl: recording?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getAudiobookTrackDetailStaticPaths,
		(d) => d.audiobookTracks.nodes,
		(baseUrl, { canonicalPath }) => canonicalPath
	);
}
