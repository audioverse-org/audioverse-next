import React from 'react';

import type { CardRecordingStackFragment } from '@lib/generated/graphql';
import { SequenceContentType } from '@lib/generated/graphql';

import TeaseRecordingStack from '../teaseRecordingStack';

import CardWithTheme from './base/withTheme';
import CardHatAudiobook from './hat/audiobook';
import CardHatSermon from './hat/sermon';
import CardHatSong from './hat/song';
import CardHatStory from './hat/story';

export interface Props {
	sequence: CardRecordingStackFragment;
}

export default function CardRecordingStack({
	sequence: { favoritedRecordings, contentType },
}: Props): JSX.Element | null {
	const favoritedNodes = favoritedRecordings.nodes || [];
	const recording = favoritedNodes[0];
	const { sequence, sponsor } = recording;
	if (!sequence) return null; // Should never happen

	const { hat, theme } = (
		{
			[SequenceContentType.Audiobook]: {
				theme: 'audiobookTrack',
				hat: <CardHatAudiobook {...{ sequence, recording }} />,
			},
			[SequenceContentType.MusicAlbum]: {
				theme: 'song',
				hat: <CardHatSong sequence={sequence} />,
			},
			[SequenceContentType.Series]: {
				theme: 'sermon',
				hat: <CardHatSermon sequence={sequence} />,
			},
			[SequenceContentType.StorySeason]: {
				theme: 'story',
				hat: <CardHatStory {...{ sequence, sponsor }} />,
			},
		} as const
	)[contentType];
	return (
		<CardWithTheme theme={theme}>
			{hat}
			<TeaseRecordingStack recordings={favoritedNodes} theme={theme} />
		</CardWithTheme>
	);
}
