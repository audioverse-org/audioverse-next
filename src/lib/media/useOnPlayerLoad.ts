import { useCallback, useEffect } from 'react';
import { VideoJsPlayer } from 'video.js';

import usePlayer from './usePlayer';

type Fn = (player: VideoJsPlayer) => void;

let fns: Fn[] = [];

export default function useOnPlayerLoad() {
	const { player } = usePlayer();

	useEffect(() => {
		if (!player) return;

		const runFns = () => {
			if (!fns.length) return;
			console.log('running fns', fns);
			fns.forEach((fn) => fn(player));
			fns = [];
		};

		runFns();

		return () => {
			// Cleanup function to ensure fns are run on unmount
			runFns();
		};
	}, [player]);

	return useCallback(
		(fn: Fn) => {
			if (player) {
				fn(player);
			} else {
				fns.push(fn);
			}
		},
		[player]
	);
}
