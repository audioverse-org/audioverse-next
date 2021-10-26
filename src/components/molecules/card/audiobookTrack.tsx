import React from 'react';

import { CardRecordingFragment } from '@lib/generated/graphql';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHatAudiobook from './hat/audiobook';

interface CardAudiobookTrackProps {
	track: CardRecordingFragment;
	hideHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardAudiobookTrack({
	track,
	hideHat,
	isOptionalLink,
}: CardAudiobookTrackProps): JSX.Element {
	const { sequence } = track;
	const theme = 'audiobookTrack';

	return (
		<CardWithTheme {...{ theme }}>
			{sequence && !hideHat && (
				<CardHatAudiobook sequence={sequence} recording={track} />
			)}
			<TeaseRecording {...{ recording: track, theme, isOptionalLink }} />
		</CardWithTheme>
	);
}
