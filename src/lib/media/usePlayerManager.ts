import { useEffect, useState } from 'react';
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

import getVideoJs from './getVideoJs';
import { LocationId } from './usePlayerLocation';

const DEFAULT_OPTIONS: VideoJsPlayerOptions = {
	poster: '/img/poster.jpg',
	controls: false,
	preload: 'auto',
	defaultVolume: 1,
	techOrder: ['chromecast', 'html5'],
	plugins: {
		chromecast: {
			addButtonToControlBar: true, // Use custom designed button
		},
		airPlay: {
			addButtonToControlBar: true, // Use custom designed button
		},
	},
	playsinline: true,
};

function getLocation(locationId: LocationId) {
	return document.getElementById(`location-${locationId}`);
}

function getVideoElement() {
	const existing = document.getElementById('video-element');
	if (existing) return existing;
	const video = document.createElement('video');
	video.setAttribute('id', 'video-element');
	video.setAttribute('data-testid', 'video-element');
	return video;
}

export default function usePlayerManager() {
	const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

	useEffect(() => {
		if (!player) {
			getVideoJs()
				.then((v) => {
					const location = getLocation('origin');
					if (!location) return;
					const video = getVideoElement();
					location.appendChild(video);
					const p = v(video, DEFAULT_OPTIONS);
					p.on('fullscreenchange', () => {
						p.controls(p.isFullscreen());
					});
					setPlayer(p);
				})
				.catch((error) => console.error('Failed to load video.js', error));
		}

		return () => player?.dispose();
	}, [player]);

	return { player };
}
