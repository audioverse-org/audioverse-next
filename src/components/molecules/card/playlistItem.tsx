import React from 'react';

import type { CardRecordingFragment } from '@lib/generated/graphql';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';

interface Props {
	recording: CardRecordingFragment;
}

export default function CardPlaylistItem({ recording }: Props): JSX.Element {
	const theme = 'playlistItem';

	return (
		<CardWithTheme {...{ theme }}>
			<TeaseRecording {...{ recording, theme }} />
		</CardWithTheme>
	);
}
