import { useMutation, useQueryClient } from 'react-query';

import { addPlaylist } from '@lib/api/addPlaylist';
import { useLanguageId } from '@lib/useLanguageId';
import { Playlist } from 'types';

interface MutateVariables {
	title: string;
	options?: {
		isPublic?: boolean;
		recordingIds?: string[];
	};
}

type AddPlaylist = (
	title: string,
	options?: {
		isPublic?: boolean;
		recordingIds?: string[];
	}
) => void;

interface Context {
	snapshots: {
		key: string[];
		data: any;
	}[];
}

export function useAddPlaylist(): AddPlaylist {
	const queryClient = useQueryClient();
	const languageId = useLanguageId();

	const { mutate } = useMutation(
		(variables: MutateVariables): Promise<string | false> => {
			const { title, options = {} } = variables;
			const { recordingIds = [] } = options;
			return addPlaylist(languageId, title, {
				recordingIds,
			});
		},
		{
			onMutate: async (variables: MutateVariables) => {
				// TODO: Finish implementing optimistic updates using
				//  react-query docs guide

				const { title, options } = variables;
				const { recordingIds = [] } = options || {};

				const snapshots = await Promise.all(
					recordingIds.map(async (id: string) => {
						const key = ['playlists', 'withRecording', id];
						await queryClient.cancelQueries(key);
						const snap = queryClient.getQueryData(key);

						const newPlaylist = {
							id: '',
							title,
							hasRecording: true,
						};

						queryClient.setQueryData(key, (old) => [
							...(old as Playlist[]),
							newPlaylist,
						]);

						return { key, data: snap };
					})
				);

				// TODO: optimistically add playlist to base playlists cache, too, once
				//  we're actually using such a cache

				return { snapshots };
			},
			onError: (err, variables, context: Context | undefined) => {
				if (!context) return;

				context.snapshots.forEach(({ key, data }) => {
					queryClient.setQueryData(key, data);
				});
			},
			onSettled: async () => {
				await queryClient.invalidateQueries('playlists');
			},
		}
	);

	return (title: string, options = {}): void => mutate({ title, options });
}
