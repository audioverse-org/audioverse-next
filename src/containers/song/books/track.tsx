import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetBookSongDetailDataQuery } from '@lib/generated/graphql';
import { makeBibleMusicTrackRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

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
		canonicalPath: makeBibleMusicTrackRoute(
			languageRoute,
			book,
			r.canonicalPath
		),
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

export default withFailStates(SongBookTrack, (props) => !props.recording);
