import React from 'react';

import TeaseRecording from '../teaseRecording';
import { CardRecordingFragment } from './__generated__/recording';
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
