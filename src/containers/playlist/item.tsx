import React from 'react';

import { Recording } from '~components/organisms/recording';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

import { GetPublicPlaylistItemDetailDataQuery } from './__generated__/item';

export interface PlaylistItemProps {
	playlist: GetPublicPlaylistItemDetailDataQuery['playlist'];
	recording: GetPublicPlaylistItemDetailDataQuery['recording'];
}

function PlaylistItem({
	playlist,
	recording,
}: Must<PlaylistItemProps>): JSX.Element {
	const languageRoute = useLanguageRoute();
	const items = (playlist.recordings.nodes || []).map((r) => ({
		...r,
		canonicalPath: playlist.isPublic
			? root
					.lang(languageRoute)
					.playlists.playlist(playlist.id)
					.items(r.canonicalPath)
					.get()
			: root
					.lang(languageRoute)
					.library.playlists(playlist.id)
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
				publicPlaylist: playlist.isPublic,
				title: playlist.title,
				items,
			}}
		/>
	);
}

const WithFailStates = (props: Parameters<typeof PlaylistItem>[0]) => (
	<AndFailStates
		Component={PlaylistItem}
		componentProps={props}
		options={{ should404: (props) => !props.playlist || !props.recording }}
	/>
);
export default WithFailStates;
