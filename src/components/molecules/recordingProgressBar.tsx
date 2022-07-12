import React from 'react';

import usePlaybackSession from '@lib/usePlaybackSession';

import ProgressBar from '../atoms/progressBar';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useProgress from '@lib/hooks/useProgress';

interface ProgressBarProps {
	recording: AndMiniplayerFragment;
	interactive?: boolean;
}

export default function RecordingProgressBar({
	recording,
	interactive = true,
}: ProgressBarProps): JSX.Element {
	const { bufferedProgress } = usePlaybackSession(recording);
	const [progress, setProgress] = useProgress(recording);
	return (
		<ProgressBar
			{...{ progress, bufferedProgress }}
			setProgress={interactive ? setProgress : undefined}
		/>
	);
}
