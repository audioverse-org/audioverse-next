import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import Button from '~src/components/molecules/button';
import IconButton from '~src/components/molecules/iconButton';

import EditIcon from '../../../../../../public/img/icons/edit-light.svg';
import Modal from '../../../../../components/organisms/modal';
import PlaylistForm, {
	PlaylistProps,
} from '../../../../../components/organisms/PlaylistForm';
import {
	playlistDelete,
	PlaylistDeleteMutationVariables,
	playlistUpdate,
	PlaylistUpdateMutationVariables,
} from '../../../../../containers/library/playlist/__generated__/query';

type EditPlaylistProps = {
	id: number | string;
	isPublic: boolean;
	summary: string;
	title: string;
};

const EditPlaylist: React.FC<EditPlaylistProps> = ({
	id,
	title,
	summary,
	isPublic,
}) => {
	const [isPlaylistEditModalOpen, setIsPlaylistEditModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleCloseEditModal = () => {
		setIsPlaylistEditModalOpen(false);
	};
	const router = useRouter();
	const update = async (playlist: PlaylistProps) => {
		try {
			const data = await playlistUpdate<PlaylistUpdateMutationVariables>({
				input: { ...playlist },
				playlistId: id as string,
			});
			if (data.playlistUpdate) {
				queryClient.invalidateQueries(['playlistData']);
				await queryClient.invalidateQueries(['playlistData', { id }]);
				handleCloseEditModal();
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
					handleCloseEditModal();
					router.back();
				}
			} catch (error) {
				console.error('Error deleting playlist:', error);
			}
		}
	};

	return (
		<>
			<IconButton
				Icon={EditIcon}
				color={BaseColors.DARK}
				onClick={(e) => {
					e.preventDefault();
					setIsPlaylistEditModalOpen(true);
				}}
				backgroundColor={BaseColors.CREAM}
			/>

			<Modal
				open={isPlaylistEditModalOpen}
				onClose={handleCloseEditModal}
				title={
					<FormattedMessage id="edit_playlist" defaultMessage="Edit Playlist" />
				}
				rightElmt={
					<Button
						onClick={deletePlaylist}
						text={
							<FormattedMessage
								id="deletePlaylists"
								defaultMessage="Delete Playlist"
							/>
						}
						type="tertiary"
					/>
				}
				hideClose
			>
				<PlaylistForm
					onSubmit={update}
					onCancel={handleCloseEditModal}
					id={id}
					title={title}
					isPublic={isPublic}
					summary={summary}
					onDelete={deletePlaylist}
				/>
			</Modal>
		</>
	);
};

export default EditPlaylist;
