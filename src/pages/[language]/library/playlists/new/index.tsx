import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { PLAYLIST_REFETCH_QUERIES } from '~src/components/constants/mutations/useRecordingPlaylist';
import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import PlaylistForm, {
	PlaylistProps,
} from '../../../../../components/organisms/PlaylistForm';
import {
	playlistAdd,
	PlaylistAddMutationVariables,
} from '../../../../../containers/library/playlist/__generated__/query';

type NewPlaylistProps = {
	id: number | string;
	onClose: () => void;
};

const NewPlaylist: React.FC<NewPlaylistProps> = ({ id, onClose }) => {
	const language = useLanguageRoute();
	const queryClient = useQueryClient();
	const add = async (playlist: PlaylistProps) => {
		try {
			const data = await playlistAdd<PlaylistAddMutationVariables>({
				input: {
					language: getLanguageIdByRoute(language),
					recordingIds: [id],
					...playlist,
				},
			});
			if (data) {
				onClose();
				queryClient.invalidateQueries(PLAYLIST_REFETCH_QUERIES);
			}
		} catch (error) {
			console.error('Error adding playlist:', error);
		}
	};

	return <PlaylistForm onSubmit={add} onCancel={onClose} />;
};

export default NewPlaylist;
