import { useContext } from 'react';
import { VjsContext } from '@components/templates/andVjs';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import useWithRecording from '@lib/hooks/useWithRecording';
import useVjsValue from '@lib/hooks/useVjsValue';

export const SPEEDS = [1, 1.25, 1.5, 1.75, 2];

export default function useSpeed(
	recording: AndMiniplayerFragment | null,
	options: {
		playlistRecordings?: AndMiniplayerFragment[];
		prefersAudio?: boolean;
	} = {}
): [number, (s: number) => void] {
	const c = useContext(VjsContext);
	const withRecording = useWithRecording(recording, options);
	const [speed, _setSpeed] = useVjsValue({
		e: 'ratechange',
		get: c?.getSpeed,
		set: c?.setSpeed,
		defaultValue: 1,
	});

	const setSpeed = (s: number) => {
		withRecording(() => {
			_setSpeed(s);
		});
	};

	return [speed, setSpeed];
}
