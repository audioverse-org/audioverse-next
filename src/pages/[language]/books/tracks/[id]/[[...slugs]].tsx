import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getAudiobookTrackDetailData,
	getAudiobookTrackDetailStaticPaths,
} from '~containers/audiobook/tracks/__generated__/detail';
import AudiobookTrackDetail, {
	AudiobookTrackDetailProps,
} from '~containers/audiobook/tracks/detail';
import { IBaseProps } from '~containers/base';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default AudiobookTrackDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<AudiobookTrackDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { audiobookTrack: recording } = await getAudiobookTrackDetailData({
		id,
	}).catch(() => ({
		audiobookTrack: null,
	}));

	if (
		recording?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

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
		(baseUrl, { canonicalPath }) => canonicalPath,
	);
}
