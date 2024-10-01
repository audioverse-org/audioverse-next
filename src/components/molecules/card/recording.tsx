import React from 'react';

import { UnreachableCaseError } from '~lib/typeHelpers';
import { RecordingContentType } from '~src/__generated__/graphql';

import { CardRecordingFragment } from './__generated__/recording';
import CardAudiobookTrack from './audiobookTrack';
import CardBibleChapter from './bibleChapter';
import CardSermon from './sermon';
import CardSong from './song';
import CardStory from './story';

interface CardSermonProps {
	recording: CardRecordingFragment;
	hideHat?: boolean;
	hideSponsorHat?: boolean;
	isOptionalLink?: boolean;
	fullBleed?: boolean;
	altPath?: string;
}

export default function CardRecording({
	recording,
	hideHat,
	hideSponsorHat,
	isOptionalLink,
	fullBleed,
	altPath,
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
					{...{ recording, hideHat, isOptionalLink, hideSponsorHat, fullBleed }}
					altPath={altPath}
				/>
			);
		case RecordingContentType.Story:
			return <CardStory {...{ story: recording, hideHat, isOptionalLink }} />;

		default:
			throw new UnreachableCaseError(recordingContentType);
	}
}
