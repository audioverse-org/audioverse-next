import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	playlistAdd,
	PlaylistAddMutationVariables,
} from '../../../../../graphql/__generated__/query';
import PlaylistForm, { PlaylistProps } from '../PlaylistForm';

type NewPlaylistProps = {
	id: number | string;
	onClose: () => void;
};

const NewPlaylist: React.FC<NewPlaylistProps> = ({ id, onClose }) => {
	const language = useLanguageRoute();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const add = async (playlist: PlaylistProps) => {
		try {
			setIsLoading(true);
			const data = await playlistAdd<PlaylistAddMutationVariables>({
				input: {
					language: getLanguageIdByRoute(language),
					recordingIds: [id],
					...playlist,
				},
			});
			if (data) {
				setSuccess('Succesfully created the playlist!');
				onClose();
			} else {
				setError('Failed to add the playlist. Please try again.');
			}
		} catch (error) {
			console.error('Error adding playlist:', error);
			setError(
				'An error occurred while adding the playlist. Please try again.'
			);
		} finally {
			setIsLoading(false);
		}
	};

	const cancel = () => {
		onClose();
	};

	return (
		<div>
			{isLoading && (
				<FormattedMessage id="loading" defaultMessage="Loading..." />
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
			<PlaylistForm onSubmit={add} onCancel={cancel} />
		</div>
	);
};

export default NewPlaylist;
