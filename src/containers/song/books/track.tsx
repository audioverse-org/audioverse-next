import React from 'react';

import withFailStates from '~components/HOCs/withFailStates';
import { Recording } from '~components/organisms/recording';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

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
	const seriesItems = (recordings.nodes || []).map((r) => ({
		...r,
		canonicalPath: root
			.lang(languageRoute)
			.songs.book(book)
			.track(r.canonicalPath)
			.get(),
	}));
	const currentRecordingIndex =
		seriesItems.findIndex((r) => r.id === recording.id) || 0;
	const sequencePreviousRecording = seriesItems[currentRecordingIndex - 1];
	const sequenceNextRecording = seriesItems[currentRecordingIndex + 1];
	return (
		<Recording
			recording={{
				...recording,
				sequencePreviousRecording,
				sequenceNextRecording,
			}}
			overrideSequence={{
				book,
				seriesItems,
			}}
		/>
	);
}

export default withFailStates(SongBookTrack, {
	useShould404: (props) => !props.recording,
});
