import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import Song, { SongAlbumDetailProps } from '@containers/song/albums/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongAlbumsDetailPageData,
	getSongAlbumsDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

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
		})
	);
	if (musicAlbum?.language !== getLanguageIdByRoute(params?.language)) {
		return {
			notFound: true,
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
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
