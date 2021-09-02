import React from 'react';

import { AndMiniplayerFragment } from '@lib/generated/graphql';
import usePlaybackSession from '@lib/usePlaybackSession';

import ProgressBar from '../atoms/progressBar';

interface ProgressBarProps {
	recording: AndMiniplayerFragment;
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
