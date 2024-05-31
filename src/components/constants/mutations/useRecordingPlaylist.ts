import { useMutation, useQueryClient } from '@tanstack/react-query';

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
} {
	const requireUser = useRequireUser();
	const queryClient = useQueryClient();

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
				await queryClient.fetchQuery(PLAYLIST_REFETCH_QUERIES);
			},
			onSuccess: (data) => {
				if (data?.playlistRecordingAdd) {
					// queryClient.setQueryData<UserPlaylist | undefined>(
					// 	[playlist.id],
					// 	(old) => {
					// 		if (!old) return old;

					// 		const alreadyInPlaylist = old.recordings.edges?.find(
					// 			(edge) => edge.node.id === recordingId
					// 		);

					// 		if (alreadyInPlaylist) return old;

					// 		return {
					// 			...old,
					// 			recordings: {
					// 				...old.recordings,
					// 				aggregate: {
					// 					...old.recordings.aggregate,
					// 					count: (old.recordings.aggregate?.count || 0) + 1,
					// 				},
					// 				edges: [
					// 					...(old.recordings.edges || []),
					// 					{
					// 						__typename: 'RecordingEdge',
					// 						node: {
					// 							__typename: 'Recording',
					// 							id: recordingId,
					// 						},

					// 					},
					// 				],
					// 			},
					// 		};
					// 	}
					// );
					console.log('added');
				}
			},
			onError: (error) => {
				console.error('Error adding to playlist:', error);
			},
			onSettled: () => {
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
				await queryClient.fetchQuery(PLAYLIST_REFETCH_QUERIES);
			},
			onSuccess: (data) => {
				if (data?.playlistRecordingRemove) {
					// queryClient.setQueryData<UserPlaylist>(
					// 	[playlist.id],
					// 	(old) => {
					// 		if (!old) return old;

					// 		const newEdges = old.recordings.edges?.filter(
					// 			(edge) => edge.node.id !== recordingId
					// 		);

					// 		return {
					// 			...old,
					// 			recordings: {
					// 				...old.recordings,
					// 				aggregate: {
					// 					...old.recordings.aggregate,
					// 					count: newEdges?.length || 0,
					// 				},
					// 				edges: newEdges,
					// 			},
					// 		};
					// 	}
					// );
					console.log('removed');
				}
			},
			onError: (error) => {
				console.error('Error removing from playlist:', error);
			},
			onSettled: () => {
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
	};
}
