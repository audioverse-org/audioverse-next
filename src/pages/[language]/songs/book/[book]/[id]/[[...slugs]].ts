import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import { getBookSongDetailData } from '~containers/song/books/__generated__/track';
import SongBookTrack, {
	SongBookTrackProps,
} from '~containers/song/books/track';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';

export default SongBookTrack;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	book: string;
	id: string;
}>): Promise<GetStaticPropsResult<SongBookTrackProps & IBaseProps>> {
	const id = params?.id as string;
	const languageRoute = getLanguageIdByRoute(params?.language);
	const { musicTrack: recording, recordings } = await getBookSongDetailData({
		id,
		language: languageRoute,
		book: params?.book || '',
	}).catch(() => ({
		musicTrack: null,
		recordings: { nodes: null },
	}));
	if (recording?.language !== languageRoute) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			recording,
			book: params?.book || '',
			recordings,
			title: recording?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
