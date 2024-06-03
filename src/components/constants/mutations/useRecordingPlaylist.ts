import { useMutation, useQueryClient } from '@tanstack/react-query';
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
} from '../mutations/__generated__/recordingPlaylist';

export const PLAYLIST_REFETCH_QUERIES = ['getLibraryPlaylists'];

export function useRecordingPlaylist(
	playlist: Pick<UserPlaylist, 'id'>,
	recordingId: Recording['id']
): {
	addToPlaylist: () => void;
	removeFromPlaylist: () => void;
	isLoading: boolean;
} {
	const requireUser = useRequireUser();
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);

	const variablesAdd: PlaylistRecordingAddMutationVariables = {
		playlistId: playlist.id,
		recordingId,
	};

	const variablesRemove: PlaylistRecordingRemoveMutationVariables = {
		playlistId: playlist.id,
		recordingId,
	};

	const addToPlaylistMutation = useMutation<
		PlaylistRecordingAddMutation,
		unknown,
		PlaylistRecordingAddMutationVariables
	>(
		(variables) =>
			graphqlFetcher<
				PlaylistRecordingAddMutation,
				PlaylistRecordingAddMutationVariables
			>(PlaylistRecordingAddDocument, variables)(),
		{
			onMutate: async () => {
				setIsLoading(true);
				await queryClient.cancelQueries(PLAYLIST_REFETCH_QUERIES);
			},
			onSuccess: (data) => {
				if (data?.playlistRecordingAdd) {
					console.log('added');
				}
			},
			onError: (error) => {
				console.error('Error adding to playlist:', error);
			},
			onSettled: () => {
				setIsLoading(false);
				queryClient.invalidateQueries(PLAYLIST_REFETCH_QUERIES);
			},
		}
	);

	const removeFromPlaylistMutation = useMutation<
		PlaylistRecordingRemoveMutation,
		unknown,
		PlaylistRecordingRemoveMutationVariables
	>(
		(variables) =>
			graphqlFetcher<
				PlaylistRecordingRemoveMutation,
				PlaylistRecordingRemoveMutationVariables
			>(PlaylistRecordingRemoveDocument, variables)(),
		{
			onMutate: async () => {
				setIsLoading(true);
				await queryClient.cancelQueries(PLAYLIST_REFETCH_QUERIES);
			},
			onSuccess: (data) => {
				if (data?.playlistRecordingRemove) {
					console.log('removed');
				}
			},
			onError: (error) => {
				console.error('Error removing from playlist:', error);
			},
			onSettled: () => {
				setIsLoading(false);
				queryClient.invalidateQueries(PLAYLIST_REFETCH_QUERIES);
			},
		}
	);

	return {
		addToPlaylist: requireUser(() =>
			addToPlaylistMutation.mutate(variablesAdd)
		),
		removeFromPlaylist: requireUser(() =>
			removeFromPlaylistMutation.mutate(variablesRemove)
		),
		isLoading,
	};
}
