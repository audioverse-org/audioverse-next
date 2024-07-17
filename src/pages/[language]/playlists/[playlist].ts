import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getPlaylistPageData } from '~containers/library/playlist/__generated__/detail';
import PlaylistDetail, {
	IPlaylistDetailProps,
} from '~containers/library/playlist/detail';
import { storeRequest } from '~lib/api/storeRequest';

export default PlaylistDetail;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	playlist: string;
}>): Promise<GetServerSidePropsResult<IPlaylistDetailProps>> {
	storeRequest(req);
	const { playlist } = params?.playlist
		? await getPlaylistPageData({
				id: params.playlist,
		  }).catch(() => ({
				playlist: null,
		  }))
		: { playlist: null };

	return {
		props: {
			playlist,
		},
	};
}
