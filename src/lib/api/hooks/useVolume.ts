import React, { useContext, useEffect } from 'react';
import { PlaybackContext } from '@components/templates/andPlaybackContext';

export default function useVolume(): [Percent, (v: number) => void] {
	const playbackContext = useContext(PlaybackContext);
	const [volume, _setVolume] = React.useState<Percent>(
		playbackContext.getVolume()
	);

	useEffect(() => {
		const fn = () => {
			_setVolume(playbackContext.getVolume());
		};
		fn();
		playbackContext.on('volumechange', fn);
		return () => {
			playbackContext.off('volumechange', fn);
		};
	}, [playbackContext]);

	const setVolume = (value: number) => {
		const v = Math.max(0, Math.min(100, value)) as Percent;
		playbackContext.setVolume(v);
	};

	return [volume, setVolume];
}
