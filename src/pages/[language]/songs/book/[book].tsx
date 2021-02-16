import Song, { SongProps } from '@containers/song/song.tsx';
import { BIBLE_BOOKS, REVALIDATE } from '@lib/constants';
import { getSongBookPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleMusicRoute } from '@lib/routes';

export default Song;

export async function getStaticProps({
	params,
}: {
	params: { language: string; book: string };
}): Promise<StaticProps<SongProps>> {
	const { language: languageRoute, book } = params;
	const language = getLanguageIdByRoute(languageRoute);
	const response = await getSongBookPageData({ language, book });

	return {
		props: {
			songs: response?.musicTracks.nodes || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const routes = getLanguageRoutes();
	const sets = routes.map((r) =>
		BIBLE_BOOKS.map((b) => makeBibleMusicRoute(r, b))
	);

	return {
		paths: sets.flat(),
		fallback: true,
	};
}
