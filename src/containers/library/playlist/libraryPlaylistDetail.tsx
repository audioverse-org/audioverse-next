import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import NotFound from '~components/organisms/notFound';
import PlaylistDetail from '~containers/library/playlist/detail';
import LoadingCards from '~src/components/molecules/loadingCards';

import { getLibraryPlaylistPageData } from './__generated__/detail';

function LibraryPlaylistDetail(): JSX.Element {
	const router = useRouter();
	const playlistId = router.query.id as string;

	const { data, isLoading } = useQuery(
		['getLibraryPlaylistPageData', { id: playlistId }],
		() => getLibraryPlaylistPageData({ id: playlistId }),
		{ staleTime: Infinity }
	);

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
