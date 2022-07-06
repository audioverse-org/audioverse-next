import { useContext, useEffect, useState } from 'react';
import { PlaybackContext } from '@components/templates/andPlaybackContext';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useWithRecording from '@lib/api/hooks/useWithRecording';

export const SPEEDS = [1, 1.25, 1.5, 1.75, 2];

export default function useSpeed(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): [number, (s: number) => void] {
	const c = useContext(PlaybackContext);
	const withRecording = useWithRecording(recording, options);
	const [speed, _setSpeed] = useState<number>(c.getSpeed);

	useEffect(() => {
		const fn = () => _setSpeed(c.getSpeed());
		fn();
		c.on('ratechange', fn);
		return () => {
			c.off('ratechange', fn);
		};
	}, [c]);

	const setSpeed = (s: number) => {
		_setSpeed(s);
		withRecording(() => {
			c.setSpeed(s);
		});
	};

	return [speed, setSpeed];
}
