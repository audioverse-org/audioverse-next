import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
	playlistDelete,
	PlaylistDeleteMutationVariables,
	playlistUpdate,
	PlaylistUpdateMutationVariables,
} from '../../../../../containers/library/playlist/__generated__/query';
import PlaylistForm, { PlaylistProps } from '../PlaylistForm';

type EditPlaylistProps = {
	id: number | string;
	isPublic: boolean;
	summary: string;
	title: string;
	onClose: () => void;
	deletePlaylistRef: React.MutableRefObject<{
		deletePlaylist: () => Promise<void>;
	} | null>;
};

const useEditPlaylist = (id: number | string, onClose: () => void) => {
	const router = useRouter();

	const update = async (playlist: PlaylistProps) => {
		try {
			const data = await playlistUpdate<PlaylistUpdateMutationVariables>({
				input: { ...playlist },
				playlistId: id as string,
			});
			if (data) {
				router.replace(router.asPath);
				onClose();
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
					onClose();
					router.back();
				}
			} catch (error) {
				console.error('Error deleting playlist:', error);
			}
		}
	};

	return { update, deletePlaylist };
};

const EditPlaylist: React.FC<EditPlaylistProps> = ({
	id,
	title,
	summary,
	isPublic,
	onClose,
	deletePlaylistRef,
}) => {
	const { update, deletePlaylist } = useEditPlaylist(id, onClose);

	useEffect(() => {
		if (deletePlaylistRef) {
			deletePlaylistRef.current = { deletePlaylist };
		}
	}, [deletePlaylist, deletePlaylistRef]);

	return (
		<PlaylistForm
			onSubmit={update}
			onCancel={onClose}
			id={id}
			title={title}
			isPublic={isPublic}
			summary={summary}
			onDelete={deletePlaylist}
		/>
	);
};

export default EditPlaylist;
