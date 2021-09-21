import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import Playlists from '@containers/account/playlists';
import { storeRequest } from '@lib/api';
import { getAccountPlaylistsPageData } from '@lib/generated/graphql';
import getDehydratedProps from '@lib/getDehydratedProps';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default Playlists;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
}>): Promise<GetServerSidePropsResult<any>> {
	storeRequest(req);
	const language = getLanguageIdByRoute(params?.language);
	return getDehydratedProps([
		[
			'getAccountPlaylistsPageData',
			() => getAccountPlaylistsPageData({ language }),
		],
	]);
}
