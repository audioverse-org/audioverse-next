import Playlists from '@containers/playlist/list';
import { storeRequest } from '@lib/api';
import { getPlaylistsPageData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getPaginatedData } from '@lib/getPaginatedData';

export default Playlists;

interface Context {
	req: any;
	query: {
		language: string;
		i: string;
	};
}

export async function getServerSideProps({
	req,
	query,
}: Context): Promise<DehydratedProps> {
	storeRequest(req);
	return getDehydratedProps([
		[
			'getPlaylistsPageData',
			() =>
				getPaginatedData(query.i, getPlaylistsPageData, {
					language: getLanguageIdByRoute(query.language),
				}),
		],
	]);
}
