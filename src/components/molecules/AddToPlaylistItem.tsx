import React from 'react';

import { CardPlaylistFragment } from '~src/components/molecules/card/__generated__/playlist';

import { useRecordingPlaylist } from '../constants/mutations/useRecordingPlaylist';
import PlaylistItem from './PlaylistItem';

type Props = {
	item: CardPlaylistFragment;
	recordingId: string | number;
};

const AddToPlaylistItem = ({ item: playlist, recordingId }: Props) => {
	const { addToPlaylist, removeFromPlaylist, isLoading } = useRecordingPlaylist(
		playlist,
		recordingId,
	);

	const isRecordingInPlaylist = playlist.recordings.edges?.find(
		(item) => item.node.id === recordingId,
	);

	const toggleFromPlaylist = () => {
		if (!isRecordingInPlaylist) {
			addToPlaylist();
		} else {
			removeFromPlaylist();
		}
	};

	return (
		<PlaylistItem
			onPress={toggleFromPlaylist}
			isAdded={!!isRecordingInPlaylist}
			title={playlist.title}
			isPublic={playlist.isPublic}
			isLoading={isLoading}
		/>
	);
};

export default AddToPlaylistItem;
