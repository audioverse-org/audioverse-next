import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryPlaylistDetail, {
	ILibraryPlaylistDetailProps,
} from '@containers/library/playlist/detail';
import { storeRequest } from '@lib/api/storeRequest';
import { getLibraryPlaylistPageData } from '@lib/generated/graphql';

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
