import Song, { SongDetailProps } from '@containers/song/detail';
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
}): Promise<StaticProps<SongDetailProps>> {
	const { language: languageRoute, book } = params;
	const language = getLanguageIdByRoute(languageRoute);

	let response = undefined;
	try {
		response = await getSongBookPageData({ language, book });
	} catch {
		// do nothing
	}

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
