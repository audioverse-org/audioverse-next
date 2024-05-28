import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { getLanguageIdByRoute } from '~src/lib/getLanguageIdByRoute';
import usePreviousRoute from '~src/lib/hooks/usePreviousRoute';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import PlaylistForm, { PlaylistProps } from '../PlaylistForm';
import {
	playlistAdd,
	PlaylistAddMutationVariables,
} from './__generated__/query';

const NewPlaylist: React.FC = () => {
	const router = useRouter();
	const language = useLanguageRoute();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const previousRoute = usePreviousRoute();

	const add = async (playlist: PlaylistProps) => {
		try {
			const data = await playlistAdd<PlaylistAddMutationVariables>({
				input: {
					language: getLanguageIdByRoute(language),
					recordingIds: [router.query.id as string],
					...playlist,
				},
			});
			if (data) {
				// Navigate back to the previous page
				   if (previousRoute) {
					console.log(previousRoute);
					router.push(previousRoute);
					} else {
					router.back();
					}
				
			} else {
				// Handle the case where data is not returned as expected
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
		router.back(); // Navigate back to the previous page
	};

	return (
		<div>
			{isLoading && (
				<FormattedMessage id="loading" defaultMessage="Loading..." />
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<PlaylistForm onSubmit={add} onCancel={cancel} />
		</div>
	);
};

export default NewPlaylist;
