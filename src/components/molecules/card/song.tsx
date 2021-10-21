import React from 'react';

import { CardRecordingFragment } from '@lib/generated/graphql';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHatSong from './hat/song';

interface CardSongProps {
	song: CardRecordingFragment;
	hideHat?: boolean;
	isOptionalLink?: boolean;
}

export default function CardSong({
	song,
	hideHat,
	isOptionalLink,
}: CardSongProps): JSX.Element {
	const { sequence } = song;
	const theme = 'song';

	return (
		<CardWithTheme {...{ theme }}>
			{sequence && !hideHat && <CardHatSong sequence={sequence} />}
			<TeaseRecording {...{ recording: song, theme, isOptionalLink }} />
		</CardWithTheme>
	);
}
