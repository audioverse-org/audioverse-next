import React from 'react';

import {
	CardRecordingFragment,
	RecordingContentType,
} from '@lib/generated/graphql';
import { UnreachableCaseError } from '@lib/typeHelpers';

import CardAudiobookTrack from './audiobookTrack';
import CardSermon from './sermon';
import CardSong from './song';
import CardStory from './story';

interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
}

export default function CardRecording({
	recording,
	hideHat,
}: CardSermonProps): JSX.Element {
	const { contentType } = recording;
	switch (contentType) {
		case RecordingContentType.AudiobookTrack:
			return <CardAudiobookTrack {...{ track: recording, hideHat }} />;
		case RecordingContentType.MusicTrack:
			return <CardSong {...{ song: recording, hideHat }} />;
		case RecordingContentType.Sermon:
			return <CardSermon {...{ recording, hideHat }} />;
		case RecordingContentType.Story:
			return <CardStory {...{ story: recording, hideHat }} />;

		default:
			throw new UnreachableCaseError(contentType);
	}
}
