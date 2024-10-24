import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getSongAlbumsDetailPageData,
	getSongAlbumsDetailPathsData,
} from '~containers/song/albums/__generated__/detail';
import Song, { SongAlbumDetailProps } from '~containers/song/albums/detail';
import { REVALIDATE, REVALIDATE_FAILURE } from '~lib/constants';
import { getDetailStaticPaths } from '~lib/getDetailStaticPaths';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';

export default Song;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; id: string }>): Promise<
	GetStaticPropsResult<SongAlbumDetailProps & IBaseProps>
> {
	const id = params?.id as string;

	const { musicAlbum } = await getSongAlbumsDetailPageData({ id }).catch(
		() => ({
			musicAlbum: null,
		}),
	);
	if (
		musicAlbum?.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
			revalidate: REVALIDATE_FAILURE,
		};
	}

	return {
		props: {
			sequence: musicAlbum,
			title: musicAlbum?.title,
			canonicalUrl: musicAlbum?.canonicalUrl,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getDetailStaticPaths(
		getSongAlbumsDetailPathsData,
		(d) => d.musicAlbums.nodes,
		(_, { canonicalPath }) => canonicalPath,
	);
}
