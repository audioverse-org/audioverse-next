import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { graphqlFetcher } from '~lib/api/graphqlFetcher';
import { Recording, UserPlaylist } from '~src/__generated__/graphql';
import useRequireUser from '~src/lib/hooks/useRequireUser';

import {
	PlaylistRecordingAddDocument,
	PlaylistRecordingAddMutation,
	PlaylistRecordingAddMutationVariables,
	PlaylistRecordingRemoveDocument,
	PlaylistRecordingRemoveMutation,
	PlaylistRecordingRemoveMutationVariables,
} from './__generated__/useRecordingPlaylist';

export function useRecordingPlaylist(
	playlist?: Pick<UserPlaylist, 'id'>,
	recordingId?: Recording['id'],
): {
	addToPlaylist: () => void;
	removeFromPlaylist: () => void;
	isLoading: boolean;
} {
	const requireUser = useRequireUser();
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);
	const invalidateQueries = ['getLibraryPlaylistsData'];

	const addToPlaylist = () => {
		if (!playlist || !recordingId) return;

		setIsLoading(true);
		const variablesAdd: PlaylistRecordingAddMutationVariables = {
			playlistId: playlist.id,
			recordingId,
		};

		graphqlFetcher<
			PlaylistRecordingAddMutation,
			PlaylistRecordingAddMutationVariables
		>(PlaylistRecordingAddDocument, variablesAdd)()
			.then((data) => {
				if (data?.playlistRecordingAdd) {
					queryClient.invalidateQueries({
						queryKey: invalidateQueries,
					});
					queryClient.invalidateQueries({
						queryKey: ['getLibraryPlaylistPageData', { id: playlist.id }],
					});
				}
			})
			.catch((error) => {
				console.error('Error adding to playlist:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const removeFromPlaylist = () => {
		if (!playlist || !recordingId) return;

		setIsLoading(true);
		const variablesRemove: PlaylistRecordingRemoveMutationVariables = {
			playlistId: playlist.id,
			recordingId,
		};

		graphqlFetcher<
			PlaylistRecordingRemoveMutation,
			PlaylistRecordingRemoveMutationVariables
		>(PlaylistRecordingRemoveDocument, variablesRemove)()
			.then((data) => {
				if (data?.playlistRecordingRemove) {
					queryClient.invalidateQueries({
						queryKey: invalidateQueries,
					});
					queryClient.invalidateQueries({
						queryKey: ['getLibraryPlaylistPageData', { id: playlist.id }],
					});
				}
			})
			.catch((error) => {
				console.error('Error removing from playlist:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return {
		addToPlaylist: requireUser(addToPlaylist),
		removeFromPlaylist: requireUser(removeFromPlaylist),
		isLoading,
	};
}
