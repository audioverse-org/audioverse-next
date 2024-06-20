import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import PlaylistItem, { PlaylistItemProps } from '~containers/playlist/item';
import { storeRequest } from '~lib/api/storeRequest';
import { getPlaylistItemDetailData } from '~src/containers/playlist/__generated__/item';

export default PlaylistItem;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	id: string;
	playlist: string;
}>): Promise<GetServerSidePropsResult<PlaylistItemProps>> {
	storeRequest(req);
	const id = params?.id as string;
	const playlistId = params?.playlist as string;
	const { me, recording } = await getPlaylistItemDetailData({
		id,
		playlistId,
	}).catch(() => ({
		me: null,
		recording: null,
	}));

	return {
		props: {
			playlist: me?.user.playlist || null,
			recording,
		},
	};
}
