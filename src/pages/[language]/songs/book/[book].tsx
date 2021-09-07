import SongBookDetail, {
	SongBooksDetailProps,
} from '@containers/song/books/detail';
import { BIBLE_BOOKS, REVALIDATE } from '@lib/constants';
import { getSongBooksDetailPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeBibleMusicRoute } from '@lib/routes';

export default SongBookDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; book: string };
}): Promise<StaticProps<SongBooksDetailProps>> {
	const { language: languageRoute, book } = params;
	const language = getLanguageIdByRoute(languageRoute);

	const { musicTracks } = await getSongBooksDetailPageData({
		language,
		book,
	}).catch(() => ({ musicTracks: { nodes: [] } }));

	return {
		props: {
			musicTracks: musicTracks.nodes || [],
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
