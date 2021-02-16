import Song, { SongProps } from '@containers/song/song';
import { REVALIDATE } from '@lib/constants';
import {
	getSongAlbumPageData,
	getSongAlbumPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeAlbumRoute } from '@lib/routes';

export default Song;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<StaticProps<SongProps>> {
	const { id } = params;

	const response = await getSongAlbumPageData({ id });

	return {
		props: {
			songs: response?.musicAlbum?.recordings.nodes || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSongAlbumPathsData,
		'musicAlbums.nodes',
		(languageRoute, node) => makeAlbumRoute(languageRoute, node.id)
	);
}
