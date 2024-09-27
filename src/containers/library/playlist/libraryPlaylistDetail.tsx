import { useRouter } from 'next/router';
import React from 'react';

import NotFound from '~components/organisms/notFound';
import PlaylistDetail from '~containers/library/playlist/detail';
import LoadingCards from '~src/components/molecules/loadingCards';

import { useGetLibraryPlaylistPageDataQuery } from './__generated__/detail';

function LibraryPlaylistDetail(): JSX.Element {
	const router = useRouter();
	const playlistId = router.query.playlist as string;
	const { data, isLoading } = useGetLibraryPlaylistPageDataQuery({
		id: playlistId,
	});

	if (isLoading) {
		return <LoadingCards />;
	}

	const playlist = data?.me?.user.playlist;

	if (!playlist) {
		return <NotFound />;
	}

	return <PlaylistDetail playlist={playlist} />;
}

export default LibraryPlaylistDetail;
