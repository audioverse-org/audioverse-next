import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

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

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	i: string;
}>): Promise<GetStaticPropsResult<SongAlbumsListProps>> {
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
