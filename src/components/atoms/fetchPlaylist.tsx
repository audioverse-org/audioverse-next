import { QueryClient, useQuery } from '@tanstack/react-query';

import { getLibraryPlaylistPageData } from '~containers/library/playlist/__generated__/detail';

export const fetchPlaylist = async (id: string) => {
	const { me } = id
		? await getLibraryPlaylistPageData({ id }).catch(() => ({ me: null }))
		: { me: null };
	return me?.user?.playlist || null;
};

export const prefetchPlaylist = async (
	queryClient: QueryClient,
	id: string
) => {
	await queryClient.prefetchQuery(['playlist', id], () => fetchPlaylist(id));
};

export const invalidatePlaylist = async (
	queryClient: QueryClient,
	id: string
) => {
	await queryClient.invalidateQueries(['playlist', id]);
};

export const usePlaylist = (id: string) => {
	return useQuery(['playlist', id], () => fetchPlaylist(id), {
		enabled: !!id,
	});
};
