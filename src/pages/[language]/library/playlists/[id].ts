// getServerSideProps.tsx

import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import LibraryPlaylistDetail, {
	ILibraryPlaylistDetailProps,
} from '~containers/library/playlist/detail';
import { storeRequest } from '~lib/api/storeRequest';
import {
	fetchPlaylist,
	prefetchPlaylist,
} from '~src/components/atoms/fetchPlaylist';

export default LibraryPlaylistDetail;

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext<{
	language: string;
	id: string;
}>): Promise<
	GetServerSidePropsResult<
		ILibraryPlaylistDetailProps & {
			dehydratedState: DehydratedState;
		}
	>
> {
	storeRequest(req);

	const id = params?.id.toString(); // Ensure id is treated as a string

	const queryClient = new QueryClient();

	await prefetchPlaylist(queryClient, id as string);

	const playlist = await fetchPlaylist(id as string);

	return {
		props: {
			playlist,
			dehydratedState: dehydrate(queryClient),
		},
	};
}
