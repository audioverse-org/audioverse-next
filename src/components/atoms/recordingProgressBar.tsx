import React from 'react';

import {
	AndMiniplayerFragment,
	RecordingProgressBarFragment,
} from '@lib/generated/graphql';
import usePlaybackSession from '@lib/usePlaybackSession';

import ProgressBar from './progressBar';

interface ProgressBarProps {
	recording: RecordingProgressBarFragment & AndMiniplayerFragment;
	interactive?: boolean;
}

export default function RecordingProgressBar({
	recording,
	interactive = true,
}: ProgressBarProps): JSX.Element {
	const session = usePlaybackSession(recording);
	const progress = session.progress;
	return (
		<ProgressBar
			progress={progress}
			setProgress={interactive ? session.setProgress : undefined}
		/>
	);
}
