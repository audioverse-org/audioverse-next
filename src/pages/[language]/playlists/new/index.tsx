//import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
//import usePreviousRoute from '~src/lib/hooks/usePreviousRoute';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import PlaylistForm, { PlaylistProps } from '../PlaylistForm';
import {
	playlistAdd,
	PlaylistAddMutationVariables,
} from './__generated__/query';

type NewPlaylistProps = {
	id: number | string;
	onClose: () => void;
};

const NewPlaylist: React.FC<NewPlaylistProps> = ({id, onClose}) => {
	//const router = useRouter();
	const language = useLanguageRoute();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	//const previousRoute = usePreviousRoute();

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
