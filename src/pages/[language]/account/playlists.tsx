import { GetServerSidePropsResult } from 'next';

import Playlists from '@containers/account/playlists';
import { storeRequest } from '@lib/api';
import { getAccountPlaylistsPageData } from '@lib/generated/graphql';
import getDehydratedProps from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Playlists;

interface Context {
	req: any;
	query: {
		language: string;
	};
}

export async function getServerSideProps({
	req,
	query,
}: Context): Promise<GetServerSidePropsResult<any>> {
	storeRequest(req);
	const language = getLanguageIdByRoute(query.language);
	return getDehydratedProps([
		[
			'getAccountPlaylistsPageData',
			() => getAccountPlaylistsPageData({ language }),
		],
	]);
}
