import React from 'react';

import usePlaybackSession from '@lib/usePlaybackSession';

import ProgressBar from '../atoms/progressBar';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';

interface ProgressBarProps {
	recording: AndMiniplayerFragment;
	interactive?: boolean;
}

export default function RecordingProgressBar({
	recording,
	interactive = true,
}: ProgressBarProps): JSX.Element {
	const { progress, bufferedProgress, setProgress } =
		usePlaybackSession(recording);
	return (
		<ProgressBar
			{...{ progress, bufferedProgress }}
			setProgress={interactive ? setProgress : undefined}
		/>
	);
}
