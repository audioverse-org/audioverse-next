import React from 'react';

import TeaseRecording from '@components/molecules/teaseRecording';
import {
	CardRecordingStackFragment,
	SequenceContentType,
} from '@lib/generated/graphql';

import CardWithTheme from './base/withTheme';
import CardHatAudiobook from './hat/audiobook';
import CardHatSermon from './hat/sermon';
import CardHatSong from './hat/song';
import CardHatStory from './hat/story';
import styles from './recordingStack.module.scss';

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
	// TODO: add expand/contract
	return (
		<CardWithTheme theme={theme}>
			{hat}
			{favoritedNodes.map((recording, index) => (
				<React.Fragment key={recording.canonicalPath}>
					<TeaseRecording
						{...{ recording, theme }}
						small={favoritedNodes.length > 1}
					/>
					{index + 1 < favoritedNodes.length && (
						<div className={styles.separator} />
					)}
				</React.Fragment>
			))}
		</CardWithTheme>
	);
}
