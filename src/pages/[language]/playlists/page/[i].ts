import { GetServerSidePropsContext } from 'next';

import Playlists from '@containers/playlist/list';
import { storeRequest } from '@lib/api';
import { getPlaylistsPageData } from '@lib/generated/graphql';
import getDehydratedProps, { DehydratedProps } from '@lib/getDehydratedProps';
import { getPaginatedData } from '@lib/getPaginatedData';

export default Playlists;

export async function getServerSideProps({
	req,
	query,
}: GetServerSidePropsContext): Promise<DehydratedProps> {
	storeRequest(req);
	// TODO: Improve query type to avoid using "as"
	return getDehydratedProps([
		[
			'getPlaylistsPageData',
			() =>
				getPaginatedData(
					query as { language: string; i: string },
					getPlaylistsPageData
				),
		],
	]);
}
