import React from 'react';

import withFailStates from '~components/HOCs/withFailStates';
import { Recording } from '~components/organisms/recording';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { Must } from '~src/types/types';

import { GetPlaylistItemDetailDataQuery } from './__generated__/item';

export interface PlaylistItemProps {
	playlist: GetPlaylistItemDetailDataQuery['playlist'];
	recording: GetPlaylistItemDetailDataQuery['recording'];
}

function PlaylistItem({
	playlist,
	recording,
}: Must<PlaylistItemProps>): JSX.Element {
	const languageRoute = useLanguageRoute();
	const items = (playlist.recordings.nodes || []).map((r) => ({
		...r,
		canonicalPath: root
			.lang(languageRoute)
			.playlists.playlist(playlist.id)
			.items(r.canonicalPath)
			.get(),
	}));
	const currentRecordingIndex =
		items.findIndex((r) => r.id === recording.id) || 0;
	const sequencePreviousRecording = items[currentRecordingIndex - 1];
	const sequenceNextRecording = items[currentRecordingIndex + 1];
	return (
		<Recording
			recording={{
				...recording,
				sequencePreviousRecording,
				sequenceNextRecording,
			}}
			overrideSequence={{
				playlistId: playlist.id,
				title: playlist.title,
				items,
			}}
		/>
	);
}

export default withFailStates(PlaylistItem, {
	useShould404: (props) => !props.playlist || !props.recording,
});
