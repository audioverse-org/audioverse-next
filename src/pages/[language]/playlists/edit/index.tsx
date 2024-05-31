import { useRouter } from 'next/router';
import React, { forwardRef, useImperativeHandle } from 'react';

import useLanguageRoute from '~src/lib/useLanguageRoute';

import {
	playlistDelete,
	PlaylistDeleteMutationVariables,
	playlistUpdate,
	PlaylistUpdateMutationVariables,
} from '../../../../graphql/__generated__/query';
import PlaylistForm, { PlaylistProps } from '../PlaylistForm';

type EditPlaylistProps = {
	id: number | string;
	isPublic: boolean;
	summary: string;
	title: string;
	onClose: () => void;
};

export type EditPlaylistRef = {
	deletePlaylist: () => Promise<void>;
};

const EditPlaylist = forwardRef<EditPlaylistRef, EditPlaylistProps>(
	(props, ref) => {
		const { id, title, summary, isPublic, onClose } = props;
		const router = useRouter();
		const language = useLanguageRoute();
		const update = async (playlist: PlaylistProps) => {
			try {
				const data = await playlistUpdate<PlaylistUpdateMutationVariables>({
					input: {
						...playlist,
					},
					playlistId: id as string,
				});
				if (data) {
					onClose();
					router.reload();
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

		useImperativeHandle(ref, () => ({
			deletePlaylist,
		}));

		return (
			<PlaylistForm
				onSubmit={update}
				onCancel={() => onClose()}
				id={id as string}
				title={title as string}
				isPublic={isPublic}
				summary={summary as string}
				onDelete={deletePlaylist}
			/>
		);
	}
);

EditPlaylist.displayName = 'EditPlaylist';

export default EditPlaylist;
