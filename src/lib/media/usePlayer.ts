import { useCallback, useEffect, useState } from 'react';
import { VideoJsPlayer } from 'video.js';

import getVideoJs from './getVideoJs';

export default function usePlayer() {
	const [parent, setParent] = useState<HTMLDivElement | null>(null);
	const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

	useEffect(() => {
		if (!player && parent) {
			getVideoJs()
				.then((v) => {
					const el = document.createElement('video');
					parent.appendChild(el);
					setPlayer(v(el));
				})
				.catch((error) => console.error('Failed to load video.js', error));
		}

		return () => {
			if (!player || !parent) return;
			player.dispose();
			if (!parent.firstChild) return;
			parent.removeChild(parent.firstChild);
		};
	}, [player, parent]);

	const movePlayer = useCallback(
		(newParent: HTMLDivElement) => {
			if (!parent?.firstChild) return;
			if (newParent === parent) return;
			newParent.appendChild(parent.firstChild);
			setParent(newParent);
		},
		[parent]
	);

	return { movePlayer, player };
}
