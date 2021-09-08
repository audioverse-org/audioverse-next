import AudiobookTrackDetail, {
	AudiobookTrackDetailProps,
} from '@containers/audiobook/tracks/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookTrackDetailData,
	getAudiobookTrackDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeAudiobookTrackRoute } from '@lib/routes';

export default AudiobookTrackDetail;

export type AudiobookTrackStaticProps = StaticProps<
	AudiobookTrackDetailProps & {
		title?: string;
	}
>;

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<AudiobookTrackStaticProps> {
	const { id } = params;
	const { audiobookTrack: recording } = await getAudiobookTrackDetailData({
		id,
	}).catch(() => ({
		audiobookTrack: null,
	}));

	return {
		props: {
			recording,
			title: recording?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getAudiobookTrackDetailStaticPaths,
		(d) => d.audiobookTracks.nodes,
		(baseUrl, node) => makeAudiobookTrackRoute(baseUrl, node.id)
	);
}
