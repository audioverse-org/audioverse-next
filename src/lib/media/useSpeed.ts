import { useState } from 'react';
import { VideoJsPlayer } from 'video.js';

export default function useSpeed(player: VideoJsPlayer | undefined) {
	const [_speed, _setSpeed] = useState<number>(1); // Ensure that speed changes trigger rerenders and are preserved across tracks

	return {
		getSpeed: () => _speed,
		setSpeed: (s: number) => {
			player?.playbackRate(s);
			player?.defaultPlaybackRate(s);
			player?.play();
			_setSpeed(s);
		},
	};
}
