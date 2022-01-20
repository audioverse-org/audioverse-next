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
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';

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
		(baseUrl, { canonicalPath }) => canonicalPath
	);
}
