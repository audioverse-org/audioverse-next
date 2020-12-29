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

				// const snap = queryClient.getQueryData(['playlists', 'withRecording', recordingId])

				recordingIds.forEach((id: string) => {
					queryClient.setQueryData(
						['playlists', 'withRecording', id],
						(old) => {
							return [
								...(old as Playlist[]),
								{
									id: '',
									title,
									hasRecording: true,
								},
							];
						}
					);
				});

				// TODO: optimistically add playlist to base playlists cache, too, once
				//  we're actually using such a cache
			},
			onSettled: async () => {
				await queryClient.invalidateQueries('playlists');
			},
		}
	);

	return (title: string, options = {}): void => mutate({ title, options });
}
