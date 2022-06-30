import React from 'react';

import { RecordingContentType } from '@src/__generated__/graphql';
import { UnreachableCaseError } from '@lib/typeHelpers';

import CardAudiobookTrack from './audiobookTrack';
import CardBibleChapter from './bibleChapter';
import CardSermon from './sermon';
import CardSong from './song';
import CardStory from './story';
import { CardRecordingFragment } from '@components/molecules/card/__generated__/recording';

interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	hideSponsorHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardRecording({
	recording,
	hideHat,
	hideSponsorHat,
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
		case RecordingContentType.BibleChapter:
			return <CardBibleChapter {...{ recording, hideHat, isOptionalLink }} />;
		case RecordingContentType.MusicTrack:
			return <CardSong {...{ song: recording, hideHat, isOptionalLink }} />;
		case RecordingContentType.Sermon:
			return (
				<CardSermon
					{...{ recording, hideHat, isOptionalLink, hideSponsorHat }}
				/>
			);
		case RecordingContentType.Story:
			return <CardStory {...{ story: recording, hideHat, isOptionalLink }} />;

		default:
			throw new UnreachableCaseError(recordingContentType);
	}
}
