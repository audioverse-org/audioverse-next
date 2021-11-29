import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import StoryAlbumsList, {
	SongAlbumsListProps,
} from '@containers/song/albums/list';
import { REVALIDATE } from '@lib/constants';
import { getSongAlbumsListPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSongAlbumsListRoute } from '@lib/routes';

export default StoryAlbumsList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	i: string;
}>): Promise<GetStaticPropsResult<SongAlbumsListProps>> {
	const { musicAlbums, musicBookTags } = await getSongAlbumsListPageData({
		language: getLanguageIdByRoute(params?.language),
	});
	return {
		props: {
			musicAlbums,
			musicBookTags,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		paths: getLanguageRoutes().map((base_url) =>
			makeSongAlbumsListRoute(base_url)
		),
		fallback: false,
	};
}
