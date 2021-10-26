import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import SongDetail, { SongDetailProps } from '@containers/song/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongDetailData,
	getSongDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default SongDetail;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ id: string }>): Promise<
	GetStaticPropsResult<SongDetailProps & IBaseProps>
> {
	const id = params?.id as string;
	const { musicTrack: recording } = await getSongDetailData({
		id,
	}).catch(() => ({
		musicTrack: null,
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
		getSongDetailStaticPaths,
		(d) => d.musicTracks.nodes,
		(baseUrl, { canonicalPath }) => canonicalPath
	);
}
