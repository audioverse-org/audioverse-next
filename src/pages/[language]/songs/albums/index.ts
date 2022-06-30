import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import StoryAlbumsList, {
	SongAlbumsListProps,
} from '@containers/song/albums/list';
import { REVALIDATE } from '@lib/constants';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSongAlbumsListRoute } from '@lib/routes/makeSongAlbumsListRoute';
import { getSongAlbumsListPageData } from '@containers/song/albums/__generated__/list';

export default StoryAlbumsList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	i: string;
}>): Promise<GetStaticPropsResult<SongAlbumsListProps & IBaseProps>> {
	const language = getLanguageIdByRoute(params?.language);
	const intl = await getIntl(language);
	const { musicAlbums, musicBookTags } = await getSongAlbumsListPageData({
		language,
	});
	return {
		props: {
			musicAlbums,
			musicBookTags,
			title: intl.formatMessage({
				id: 'storyAlbums__title',
				defaultMessage: 'Scripture Songs',
			}),
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
