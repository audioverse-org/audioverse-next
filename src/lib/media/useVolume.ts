import { useState } from 'react';
import { VideoJsPlayer } from 'video.js';

export default function useVolume(player?: VideoJsPlayer | null) {
	// WORKAROUND: Ensure that volume changes trigger rerenders
	const [, setVolume] = useState<number>(100);

	return {
		setVolume: (volume: number) => {
			player?.volume(volume / 100);
			setVolume(volume);
		},
		getVolume: () => (player?.volume() ?? 1) * 100,
	};
}
