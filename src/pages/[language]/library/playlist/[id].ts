import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getLibraryPlaylistPageData } from '~containers/library/playlist/__generated__/detail';
import LibraryPlaylistDetail, {
	ILibraryPlaylistDetailProps,
} from '~containers/library/playlist/detail';
import { storeRequest } from '~lib/api/storeRequest';

export default LibraryPlaylistDetail;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	id: string;
}>): Promise<GetServerSidePropsResult<ILibraryPlaylistDetailProps>> {
	storeRequest(req);
	const { me } = params?.id
		? await getLibraryPlaylistPageData({
				id: params.id,
		  }).catch(() => ({
				me: null,
		  }))
		: { me: null };

	return {
		props: {
			playlist: me?.user.playlist || null,
		},
	};
}
