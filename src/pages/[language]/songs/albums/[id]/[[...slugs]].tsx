import Song, { SongAlbumDetailProps } from '@containers/song/albums/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongAlbumsDetailPageData,
	getSongAlbumsDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default Song;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<StaticProps<SongAlbumDetailProps>> {
	const { id } = params;

	const { musicAlbum } = await getSongAlbumsDetailPageData({ id }).catch(
		() => ({
			musicAlbum: null,
		})
	);

	return {
		props: {
			sequence: musicAlbum,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSongAlbumsDetailPathsData,
		(d) => d.musicAlbums.nodes,
		(languageRoute, { canonicalPath }) => canonicalPath
	);
}
