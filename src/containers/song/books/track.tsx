import React from 'react';

import { Recording } from '~components/organisms/recording';
import root from '~lib/routes';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

import { GetBookSongDetailDataQuery } from './__generated__/track';

export type SongTrack = NonNullable<GetBookSongDetailDataQuery['musicTrack']>;

export interface SongBookTrackProps {
	book: string;
	recording: SongTrack | null;
	recordings: GetBookSongDetailDataQuery['recordings'];
}

function SongBookTrack({
	recording,
	book,
	recordings,
}: Must<SongBookTrackProps>): JSX.Element {
	const languageRoute = useLanguageRoute();
	const items = (recordings.nodes || []).map((r) => ({
		...r,
		canonicalPath: root
			.lang(languageRoute)
			.songs.book(book)
			.track(r.canonicalPath)
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
				title: book,
				items,
			}}
		/>
	);
}

const WithFailStates = (props: Parameters<typeof SongBookTrack>[0]) => (
	<AndFailStates
		Component={SongBookTrack}
		componentProps={props}
		options={{ should404: (props) => !props.recording }}
	/>
);
export default WithFailStates;
