import SongDetail, { SongDetailProps } from '@containers/song/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongDetailData,
	getSongDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default SongDetail;

export type SongTrackStaticProps = StaticProps<
	SongDetailProps & {
		title?: string;
	}
>;

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<SongTrackStaticProps> {
	const { id } = params;
	const { musicTrack: recording } = await getSongDetailData({
		id,
	}).catch(() => ({
		musicTrack: null,
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
		getSongDetailStaticPaths,
		(d) => d.musicTracks.nodes,
		(baseUrl, { canonicalPath }) => canonicalPath
	);
}
