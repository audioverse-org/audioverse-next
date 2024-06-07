import React from 'react';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	playlistAdd,
	PlaylistAddMutationVariables,
} from '../../../../../containers/library/playlist/__generated__/query';
import PlaylistForm, { PlaylistProps } from '../PlaylistForm';

type NewPlaylistProps = {
	id: number | string;
	onClose: () => void;
};

const NewPlaylist: React.FC<NewPlaylistProps> = ({ id, onClose }) => {
	const language = useLanguageRoute();

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
			}
		} catch (error) {
			console.error('Error adding playlist:', error);
		}
	};

	return <PlaylistForm onSubmit={add} onCancel={onClose} />;
};

export default NewPlaylist;
