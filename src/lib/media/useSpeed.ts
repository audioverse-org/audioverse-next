import { useEffect, useState } from 'react';
import { VideoJsPlayer } from 'video.js';

export default function useSpeed(player: VideoJsPlayer | undefined | null) {
	// WORKAROUND: Ensure that speed changes trigger rerenders and are
	// preserved across tracks
	const [speed, setSpeed] = useState<number>(1);

	useEffect(() => {
		player?.playbackRate(speed);
		player?.defaultPlaybackRate(speed);
		player?.play();
	}, [speed, player]);

	return {
		speed,
		setSpeed,
	};
}
