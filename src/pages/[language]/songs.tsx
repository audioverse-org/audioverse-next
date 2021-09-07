import SongList, { SongsProps } from '@containers/song/albums/list';
import { REVALIDATE } from '@lib/constants';
import { getSongsListPageData } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';
import { makeSongsListRoute } from '@lib/routes';

export default SongList;

export async function getStaticProps({
	params,
}: {
	params: { language: string };
}): Promise<StaticProps<SongsProps>> {
	const { language } = params;
	const languageId = getLanguageIdByRoute(language);
	// TODO: try/catch errors to ensure proper 404 page is displayed
	const data = await getSongsListPageData({ language: languageId });

	return {
		props: { data },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	const routes = getLanguageRoutes();

	return {
		paths: routes.map(makeSongsListRoute),
		fallback: true,
	};
}
