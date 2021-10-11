import { GetStaticPathsResult } from 'next';

import StoryAlbumsList, {
	SongAlbumsListProps,
} from '@containers/song/albums/list';
import {
	getSongAlbumsListPageData,
	getSongAlbumsListPathData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default StoryAlbumsList;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		i: string;
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps<SongAlbumsListProps>> {
	return getPaginatedStaticProps(
		params,
		getSongAlbumsListPageData,
		(d) => d.musicAlbums.nodes,
		(d) => d.musicAlbums.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'songs/albums',
		getSongAlbumsListPathData,
		(d) => d.musicAlbums.aggregate?.count
	);
}
