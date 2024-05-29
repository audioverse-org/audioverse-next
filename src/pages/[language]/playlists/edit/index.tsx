import { useRouter } from 'next/router';
import React from 'react';

import useLanguageRoute from '~src/lib/useLanguageRoute';

import PlaylistForm, { PlaylistProps } from '../PlaylistForm';
import {
	playlistDelete,
	PlaylistDeleteMutationVariables,
	playlistUpdate,
	PlaylistUpdateMutationVariables,
} from './__generated__/query';

export default function EditPlaylist() {
	const router = useRouter();
	const language = useLanguageRoute();
	const { id, isPublic, summary, title } = router.query;

	const update = async (playlist: PlaylistProps) => {
		try {
			const data = await playlistUpdate<PlaylistUpdateMutationVariables>({
				input: {
					...playlist,
				},
				playlistId: id as string,
			});
			if (data) {
				router.back();
			}
		} catch (error) {
			console.error('Error updating playlist:', error);
		}
	};

	const deletePlaylist = async () => {
		if (
			confirm(
				'Are you sure? Deleting this playlist cannot be undone, and any links to it will break.'
			)
		) {
			try {
				const data = await playlistDelete<PlaylistDeleteMutationVariables>({
					playlistId: id as string,
				});
				if (data) {
					router.push(`/${language}/library/playlists`);
				}
			} catch (error) {
				console.error('Error deleting playlist:', error);
			}
		}
	};

	return (
		<PlaylistForm
			onSubmit={update}
			onCancel={() => router.back()}
			id={id as string}
			title={title as string}
			isPublic={isPublic === 'true'} // Convert isPublic to boolean
			summary={summary as string}
			onDelete={deletePlaylist}
		/>
	);
}
