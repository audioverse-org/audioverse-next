import { useEffect, useState } from 'react';

import usePlayer from './usePlayer';
import useProgress from './useProgress';

export default function useBuffered({
	recordingId,
	duration,
}: {
	recordingId?: string | number;
	duration: number;
}) {
	const { player } = usePlayer();
	const { progress } = useProgress(recordingId);
	const [bufferedProgress, setBufferedProgress] = useState<number>(0);
	const playerBufferedEnd = player?.bufferedEnd();

	useEffect(() => {
		let newBufferedProgress = +Math.max(
			bufferedProgress, // Don't ever reduce the buffered amount
			progress, // We've always buffered as much as we're playing
			(playerBufferedEnd || 0) / duration // Actually compute current buffered progress
		).toFixed(2);
		if (newBufferedProgress >= 0.99) newBufferedProgress = 1;
		setBufferedProgress(newBufferedProgress);
	}, [bufferedProgress, playerBufferedEnd, progress, duration]);

	return { bufferedProgress, setBufferedProgress };
}
