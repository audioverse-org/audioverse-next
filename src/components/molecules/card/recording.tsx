import React from 'react';

import type { CardRecordingFragment } from '@lib/generated/graphql';
import { RecordingContentType } from '@lib/generated/graphql';
import { UnreachableCaseError } from '@lib/typeHelpers';

import CardAudiobookTrack from './audiobookTrack';
import CardSermon from './sermon';
import CardSong from './song';
import CardStory from './story';

interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardRecording({
	recording,
	hideHat,
	isOptionalLink,
}: CardSermonProps): JSX.Element {
	const { recordingContentType } = recording;
	switch (recordingContentType) {
		case RecordingContentType.AudiobookTrack:
			return (
				<CardAudiobookTrack
					{...{ track: recording, hideHat, isOptionalLink }}
				/>
			);
		case RecordingContentType.MusicTrack:
			return <CardSong {...{ song: recording, hideHat, isOptionalLink }} />;
		case RecordingContentType.Sermon:
			return <CardSermon {...{ recording, hideHat, isOptionalLink }} />;
		case RecordingContentType.Story:
			return <CardStory {...{ story: recording, hideHat, isOptionalLink }} />;

		default:
			throw new UnreachableCaseError(recordingContentType);
	}
}
