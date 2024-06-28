import { useEffect, useState } from 'react';

import usePlayer from './usePlayer';

export default function useSpeed() {
	// WORKAROUND: Ensure that speed changes trigger rerenders and are
	// preserved across tracks
	const [speed, setSpeed] = useState<number>(1);
	const { player } = usePlayer();

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
