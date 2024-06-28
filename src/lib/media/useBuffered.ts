import { useEffect, useState } from 'react';
import type * as VideoJs from 'video.js';

import useProgress from './useProgress';

export default function useBuffered({
	recordingId,
	player,
	duration,
}: {
	recordingId?: string | number;
	player?: VideoJs.VideoJsPlayer | null;
	duration: number;
}) {
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
